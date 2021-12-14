from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend
from firebase_auth.mixins import FirebaseAuthMixin
from rest_framework import filters, mixins, status, viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.request import Request
from rest_framework.response import Response

from . import models, serializers


class BaseVSRetriveUpdateForUser(FirebaseAuthMixin, viewsets.GenericViewSet, mixins.RetrieveModelMixin, mixins.UpdateModelMixin):

    def _getInstance(self, request: Request):
        return self.queryset.get(id=request.user.id)

    def list(self, request: Request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def retrieve(self, request: Request, *args, **kwargs):
        instance = self._getInstance(request)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self._getInstance(request)
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)


class BaseViewSetWithPaginationAndAuth(FirebaseAuthMixin, viewsets.ModelViewSet):
    pagination_class = PageNumberPagination

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter
    ]

    filterset_fields = '__all__'
    search_fields = '__all__'
    ordering_fields = '__all__'


class TaskViewSet(BaseViewSetWithPaginationAndAuth):
    serializer_class = serializers.TaskSerializer
    queryset = models.Task.objects.all()

    ordering = ['-number']


class SubTaskViewSet(BaseViewSetWithPaginationAndAuth):
    serializer_class = serializers.SubTaskSerializer
    queryset = models.SubTask.objects.all()

    ordering = ['-id']


class UsersViewSet(FirebaseAuthMixin, viewsets.ModelViewSet):
    serializer_class = serializers.UsersSerializer
    queryset = models.Users.objects.all()

    def _getInstance(self, request: Request):
        return self.queryset.get(id=request.user.id)

    def list(self, request: Request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def retrieve(self, request: Request, *args, **kwargs):
        instance = self._getInstance(request)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def _create_first_project(self, user):
        project = models.Project.objects.create(
            name="Hello World",
            description="1º Projeto",
            created_at=timezone.now(),
            color=11235583,  # Purple: #ab70ff
            user=user
        )

        models.Project.objects.create(
            name="More One",
            description="1º Projeto",
            created_at=timezone.now(),
            color=16740437,  # OrangeDark: #ff7055
            user=user
        )

        task_timer = models.Task.objects.create(
            title="Hello World",
            note="# 1º Task",
            project=project,
            number=0,
            created_at=timezone.now(),
            timer=timezone.now() + timezone.timedelta(minutes=30)
        )

        task_over = models.Task.objects.create(
            title="Ops, Tarefa atrasada?",
            note="# Só um exemplo 😅",
            project=project,
            number=-1,
            created_at=timezone.now(),
            timer=timezone.now() - timezone.timedelta(minutes=2)
        )

        project.save()
        task_timer.save()
        task_over.save()

    def _create_about(self, user: models.Users):
        about_project = models.Project.objects.create(
            name="Sobre",
            description="Algumas informações :)",
            created_at=timezone.now(),
            color=16752697,  # Orange: #ffa039
            user=user
        )

        about_project.save()

        models.Task.objects.create(
            title="Projetos",
            note=open('data/aboutProject.md', 'r').read(),
            project=about_project,
            number=-2,
            created_at=timezone.now()
        ).save()

    def _create_history(self, user):
        models.History.objects.create(user=user).save()

    def _create_base_data(self, user: models.Users):
        self._create_first_project(user)
        self._create_about(user)
        self._create_history(user)

    def create(self, request: Request, *args, **kwargs):
        user = self.queryset.get(id=request.data.get('id'))

        if user:
            self._create_base_data(user)

        serializer = serializers.UsersSerializer(user)
        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class TaskPreviewViewSet(FirebaseAuthMixin, viewsets.GenericViewSet,
                         mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                         mixins.ListModelMixin):
    serializer_class = serializers.TaskPreview
    queryset = models.Task.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.queryset.get(id=request.user.id)
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)


class UserScoreViewSet(BaseVSRetriveUpdateForUser):
    serializer_class = serializers.UserScore
    queryset = models.Users.objects.all()


class ProjectViewSet(BaseViewSetWithPaginationAndAuth):
    serializer_class = serializers.ProjectSerializer
    queryset = models.Project.objects.all()

    ordering = ['-created_at']


class ReminderViewSet(BaseViewSetWithPaginationAndAuth):
    serializer_class = serializers.ReminderSerializer
    queryset = models.Reminder.objects.all()

    ordering = ['-date']


class HistoryViewSet(BaseVSRetriveUpdateForUser):
    serializer_class = serializers.HistorySerializer
    queryset = models.History.objects.all()

    def _getInstance(self, request: Request):
        return self.queryset.get(user=request.user.id)
