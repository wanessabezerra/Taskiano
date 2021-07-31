from rest_framework import viewsets
from task.api import serializers
from task import models


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.TaskSerializer
    queryset = models.Task.objects.all()


class UsersViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UsersSerializer
    queryset = models.Users.objects.all()


class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ProjectSerializer
    queryset = models.Project.objects.all()


class ReminderViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ReminderSerializer
    queryset = models.Reminder.objects.all()
