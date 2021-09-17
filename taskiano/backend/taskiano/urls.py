from django.contrib import admin
from django.urls import path, include

from rest_framework import routers

from api import viewsets

route = routers.DefaultRouter()

route.register(r'task', viewsets.TaskViewSet, basename="Task")
route.register(r'task-preview', viewsets.TaskPreviewViewSet, basename="TaskPreview")
route.register(r'subtask', viewsets.SubTaskViewSet, basename="Subtask")
route.register(r'users', viewsets.UsersViewSet, basename="User")
route.register(r'history', viewsets.HistoryViewSet, basename="History")
route.register(r'score', viewsets.UserScoreViewSet, basename="UserScore")
route.register(r'project', viewsets.ProjectViewSet, basename="Project")
route.register(r'reminder', viewsets.ReminderViewSet, basename="Reminder")


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(route.urls))
]
