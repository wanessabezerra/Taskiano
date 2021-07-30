from rest_framework import viewsets
from task.api import serializers
from task import models


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.TaskSerializer
    queryset = models.Task.objects.all()
