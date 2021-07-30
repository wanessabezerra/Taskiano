from rest_framework import serializers
from task import models


class TaskSerializers(serializers.ModelSerializers):
    class Meta:
        model = models.Task
        field = '__all__'
