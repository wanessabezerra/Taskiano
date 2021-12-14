from uuid import uuid4

from django.db import models
from django.utils import timezone

RELATED_NAME = '%(class)ss'


class Users(models.Model):
    id = models.CharField(primary_key=True, max_length=150)
    name = models.CharField(max_length=200)
    birthday = models.DateField(null=True)
    email = models.EmailField(max_length=256, null=True)
    score = models.FloatField(default=0, db_index=True)
    avatar = models.URLField(max_length=1024)
    countCreatedTasks = models.PositiveSmallIntegerField(default=0)


class Project(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=254, blank=True, default="")
    created_at = models.DateTimeField(null=False)
    closed_in = models.DateField(null=True, default=None)
    color = models.IntegerField(null=False, default=16777215)
    has_archived = models.BooleanField(default=False)
    user = models.ForeignKey(
        Users, related_name=RELATED_NAME, on_delete=models.CASCADE)


class Task(models.Model):

    STATUS_CHOICES = (
        ("1", "Em Execução"),
        ("2", "Concluída"),
    )

    PRIORITIES_CHOICES = (
        ("0", "Sem prioridade"),
        ("1", "Muito baixa"),
        ("2", "Baixa"),
        ("3", "Média"),
        ("4", "Média alta"),
        ("5", "Alta"),
        ("6", "Muito alta"),
        ("7", "Urgente")
    )

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    title = models.CharField(max_length=100)
    note = models.TextField(max_length=4096)
    number = models.IntegerField(null=False, blank=True)
    created_at = models.DateTimeField(null=False)
    closed_in = models.DateField(null=True, default=None)
    timer = models.DateTimeField(null=True, default=None)
    fixed = models.BooleanField(default=False)
    status = models.CharField(
        max_length=1, choices=STATUS_CHOICES, default="1")
    priority = models.CharField(
        max_length=1, choices=PRIORITIES_CHOICES, default="1")
    project = models.ForeignKey(
        Project, related_name=RELATED_NAME, on_delete=models.CASCADE)


class SubTask(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    subtask = models.ForeignKey(
        Task, related_name=RELATED_NAME, on_delete=models.CASCADE)


class Reminder(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=254)
    date = models.DateTimeField(null=True, default=None)
    task = models.ForeignKey(
        Task, related_name=RELATED_NAME, on_delete=models.CASCADE)


class Weekdays(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    mon = models.IntegerField(null=False, default=0)
    tue = models.IntegerField(null=False, default=0)
    wed = models.IntegerField(null=False, default=0)
    thu = models.IntegerField(null=False, default=0)
    fri = models.IntegerField(null=False, default=0)
    sat = models.IntegerField(null=False, default=0)
    sun = models.IntegerField(null=False, default=0)
    updated_at = models.DateTimeField(null=False, default=timezone.now)

    @classmethod
    def get_new(cls):
        return cls.objects.create().id


class History(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)

    weekdayTaskCount = models.ForeignKey(
        Weekdays,
        related_name=RELATED_NAME,
        on_delete=models.CASCADE,
        default=Weekdays.get_new
    )

    user = models.ForeignKey(
        Users,
        related_name=RELATED_NAME,
        on_delete=models.CASCADE
    )
