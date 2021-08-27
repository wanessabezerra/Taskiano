from django.contrib import admin
from django.urls import path, include

from rest_framework import routers

from task.api import viewsets as taskviewsets
from task.api import viewsets as usersviewsets
from task.api import viewsets as projectviewsets
from task.api import viewsets as reminderviewsets
from task.api import viewsets as subtaskviewsets

route = routers.DefaultRouter()

route.register(r'task', taskviewsets.TaskViewSet, basename="Task")
route.register(r'subtask', subtaskviewsets.SubTaskViewSet, basename="Subtask")
route.register(r'users', usersviewsets.UsersViewSet, basename="User")
route.register(r'project', projectviewsets.ProjectViewSet, basename="Project")
route.register(r'reminder', reminderviewsets.ReminderViewSet,
               basename="Reminder")


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(route.urls))
]
