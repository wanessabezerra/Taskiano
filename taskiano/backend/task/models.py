from django.db import models
from uuid import uuid4


class Task(models.Model):
    id_task = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    fixed = models.BooleanField(default=True)
    name = models.CharField(max_length=255)
    note = models.TextField(null=False)
    createDate = models.DateTimeField(auto_now_add=True)
    createDateOut = models.DateTimeField(auto_now=True)

    # priority = models.PositiveIntegerField(default)


class Subtask(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE)


class Thing(models.Model):
    PRIORITIES = (
        (0, 'Low'),
        (1, 'Normal'),
        (2, 'High'),
    )
# id
# fixed
# name
# note
# super
# createData
# completeDate
# priority
