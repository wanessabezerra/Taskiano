from typing import Tuple

from django.db.models.query import QuerySet
from django.utils import timezone

from rest_framework import serializers

from . import models


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Task
        fields = '__all__'

    def __getUser(self, project_id: str) -> Tuple[models.Users, QuerySet]:
        project = models.Project.objects.get(id=project_id)

        return (project.user, models.Users.objects.filter(id=project.user.id))

    def create(self, request, *args, **kwargs):
        user, query_set = self.__getUser(request['project'].id)

        query_set.update(
            countCreatedTasks=user.countCreatedTasks + 1,
            score=user.score + 1
        )

        request['number'] = user.countCreatedTasks + 1

        return super().create(request, *args, **kwargs)

    def update(self, instance: models.Task, validated_data):
        if 'status' in validated_data:
            new_status = validated_data['status']

            if new_status != instance.status:
                user, query_set = self.__getUser(instance.project.id)

                try:
                    time_is_over = instance.timer < timezone.now()
                except TypeError:
                    time_is_over = False

                offset = 2 if time_is_over else 3

                if new_status == '1' and instance.status == '2':
                    offset *= -1

                query_set.update(score=user.score + offset)

        return super().update(instance, validated_data)


class SubTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SubTask
        fields = '__all__'


class UserScore(serializers.ModelSerializer):
    class Meta:
        model = models.Users
        fields = ['score']


class TaskPreview(serializers.ModelSerializer):
    class Meta:
        model = models.Task
        fields = [
            'id',
            'title',
            'timer',
            'created_at',
            'status',
            'number',
            'fixed',
            'project',
            'priority'
        ]


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Users
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Project
        fields = '__all__'


class ReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Reminder
        fields = '__all__'


class WeekdaysSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Weekdays
        fields = ['mon', 'tue', 'wed', 'thu',
                  'fri', 'sat', 'sun', 'updated_at']


class HistorySerializer(serializers.ModelSerializer):
    weekdayTaskCount = WeekdaysSerializer(many=False)

    class Meta:
        weekdayTaskCount = WeekdaysSerializer(many=False, read_only=True)
        model = models.History
        fields = ['id', 'weekdayTaskCount']

    def update(self, instance: models.History, validated_data):
        weekdayTaskCount = instance.weekdayTaskCount
        weekdays: models.Weekdays = validated_data.get('weekdayTaskCount')

        weekdayTaskCount.mon = weekdays.get('mon', weekdayTaskCount.mon)
        weekdayTaskCount.tue = weekdays.get('tue', weekdayTaskCount.tue)
        weekdayTaskCount.wed = weekdays.get('wed', weekdayTaskCount.wed)
        weekdayTaskCount.thu = weekdays.get('thu', weekdayTaskCount.thu)
        weekdayTaskCount.fri = weekdays.get('fri', weekdayTaskCount.fri)
        weekdayTaskCount.sat = weekdays.get('sat', weekdayTaskCount.sat)
        weekdayTaskCount.sun = weekdays.get('sun', weekdayTaskCount.sun)
        weekdayTaskCount.updated_at = weekdays.get(
            'updated_at', weekdayTaskCount.updated_at)
        weekdayTaskCount.save()

        return instance
