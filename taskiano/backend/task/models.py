from django.conf import settings
from django.db import models
from uuid import uuid4

from django.contrib.auth.models import User


class Users(models.Model):
    id_user = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=200)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True)
    birthday = models.DateField(null=False)
    email = models.EmailField(max_length=256)
    score = models.FloatField(default=0, db_index=True)
    avatar_url = models.URLField(max_length=260)

    def __str__(self):
        return self.name


class Project(models.Model):
    id_project = models.UUIDField(
        primary_key=True, default=uuid4, editable=False)
    title = models.CharField(max_length=100)
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
        (0, 'Baixa'),
        (1, 'Normal'),
        (2, 'Alta'),
    )

    id_task = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    title = models.CharField(max_length=100)
    note = models.TextField(max_length=254)
    created_at = models.DateTimeField(auto_now_add=True)
    closed_in = models.DateField(null=True, default=None)
    timer = models.DateTimeField(null=True, default=None)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES)
    priority = models.CharField(max_length=1, choices=PRIORITIES)
    fixed = models.BooleanField(default=False)
    user = models.ForeignKey(
        User, related_name='%(class)ss', on_delete=models.CASCADE)

    def __str__(self):
        return self.id_task + ' - ' + self.name


class Reminder(models.Model):
    id_project = models.UUIDField(
        primary_key=True, default=uuid4, editable=False)
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=254)
    date = models.DateTimeField(null=True, default=None)

    task = models.ForeignKey(
        Task, related_name='%(class)ss', on_delete=models.CASCADE)
