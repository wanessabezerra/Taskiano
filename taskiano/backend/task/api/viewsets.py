from rest_framework import viewsets, filters

from task.api import serializers
from task import models

from django_filters.rest_framework import DjangoFilterBackend

from firebase_auth.mixins import FirebaseAuthMixin


class TaskViewSet(FirebaseAuthMixin, viewsets.ModelViewSet):
    serializer_class = serializers.TaskSerializer
    queryset = models.Task.objects.all()

    filter_backends = [DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = '__all__'
    search_fields = '__all__'
    ordering_fields = '__all__'


class SubTaskViewSet(FirebaseAuthMixin, viewsets.ModelViewSet):
    serializer_class = serializers.SubTaskSerializer
    queryset = models.SubTask.objects.all()


class UsersViewSet(FirebaseAuthMixin, viewsets.ModelViewSet):
    serializer_class = serializers.UsersSerializer
    queryset = models.Users.objects.all()

    filter_backends = [DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = '__all__'
    search_fields = '__all__'
    ordering_fields = '__all__'


class ProjectViewSet(FirebaseAuthMixin, viewsets.ModelViewSet):
    serializer_class = serializers.ProjectSerializer
    queryset = models.Project.objects.all()

    filter_backends = [DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = '__all__'
    search_fields = '__all__'
    ordering_fields = '__all__'


class ReminderViewSet(FirebaseAuthMixin, viewsets.ModelViewSet):
    serializer_class = serializers.ReminderSerializer
    queryset = models.Reminder.objects.all()
