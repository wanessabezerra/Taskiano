from django.conf import settings
from django.db import models
from uuid import uuid4


class Users(models.Model):
    id = models.CharField(primary_key=True, max_length=150)
    name = models.CharField(max_length=200)
    username = models.CharField(max_length=24)
    birthday = models.DateField(null=True)
    email = models.EmailField(max_length=256, null=True)
    score = models.FloatField(default=0, db_index=True)
    avatar = models.URLField(max_length=260)

    def __str__(self):
        return self.name


class Project(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=254)
    created_at = models.DateTimeField(auto_now_add=True)
    closed_in = models.DateField(null=False)
    color = models.IntegerField(null=False, default=16777215)
    has_archived = models.BooleanField(default=False)


class Task(models.Model):

    STATUS_CHOICES = (
        ("1", "Planejada"),
        ("2", "Em Execução"),
        ("3", "Concluída"),
        ("4", "Cancelada"),
    )

    PRIORITIES = (
        (0, "Sem prioridade"),
        (1, "Muito baixa"),
        (2, "Baixa"),
        (3, "Média"),
        (4, "Média alta"),
        (5, "Alta"),
        (6, "Muito alta"),
        (7, "Urgente")
    )

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    title = models.CharField(max_length=100)
    note = models.TextField(max_length=4096)
    created_at = models.DateTimeField(auto_now_add=True)
    closed_in = models.DateField(null=True, default=None)
    timer = models.DateTimeField(null=True, default=None)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default="1")
    priority = models.IntegerField(choices=PRIORITIES)
    fixed = models.BooleanField(default=False)
    user = models.ForeignKey(Users, related_name='%(class)ss', on_delete=models.CASCADE)

    def __str__(self):
        return self.id + ' - ' + self.name


class SubTask(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid4, editable=False)
    subtask = models.ForeignKey(
        Task, related_name='%(class)ss', on_delete=models.CASCADE)

    def __str__(self):
        return self.id_subtask + ' - ' + self.name


class Reminder(models.Model):
    id_project = models.UUIDField(
        primary_key=True, default=uuid4, editable=False)
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=254)
    date = models.DateTimeField(null=True, default=None)

    task = models.ForeignKey(
        Task, related_name='%(class)ss', on_delete=models.CASCADE)
