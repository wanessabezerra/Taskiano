from rest_framework import viewsets
from task.api import serializers
from task import models

from firebase_auth.mixins import FirebaseAuthMixin


class TaskViewSet(FirebaseAuthMixin, viewsets.ModelViewSet):
    serializer_class = serializers.TaskSerializer
    queryset = models.Task.objects.all()


class SubTaskViewSet(FirebaseAuthMixin, viewsets.ModelViewSet):
    serializer_class = serializers.SubTaskSerializer
    queryset = models.SubTask.objects.all()


class UsersViewSet(FirebaseAuthMixin, viewsets.ModelViewSet):
    serializer_class = serializers.UsersSerializer
    queryset = models.Users.objects.all()


class ProjectViewSet(FirebaseAuthMixin, viewsets.ModelViewSet):
    serializer_class = serializers.ProjectSerializer
    queryset = models.Project.objects.all()


class ReminderViewSet(FirebaseAuthMixin, viewsets.ModelViewSet):
    serializer_class = serializers.ReminderSerializer
    queryset = models.Reminder.objects.all()
