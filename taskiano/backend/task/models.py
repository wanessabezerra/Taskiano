'''from django.conf import settings'''
from django.db import models
from uuid import uuid4

"""

class User(models.Model):

    name = models.CharField(max_length=200)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True
    )

    def __str__(self):
        return self.nome
"""


class Task(models.Model):

    STATUS_CHOICES = (
        ("1", "Planejada"),
        ("2", "Em Execução"),
        ("3", "Concluída"),
        ("4", "Cancelada"),
    )
    SITUATION_CHOICES = (
        ("1", "Aberta"),
        ("2", "Abandonada"),
        ("3", "Fechada"),
    )

    PRIORITIES = (
        (0, 'Baixa'),
        (1, 'Normal'),
        (2, 'Alta'),
    )

    id_task = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=100)
    note = models.TextField(max_length=255)
    created_in = models.DateTimeField(auto_now_add=True)
    closed_in = models.DateField(null=False)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES)
    situation = models.CharField(max_length=1, choices=SITUATION_CHOICES)
    priority = models.CharField(max_length=1, choices=PRIORITIES)

    def __str__(self):
        return self.id_task + ' - ' + self.name


"""
class Subtask(models.Model):
    subtask = models.ForeignKey(Task, on_delete=models.PROTECT)
"""
