from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from api.models import Users


class UsersViewSetTestCase(APITestCase):
    def setUp(self):
        # Create objects
        Users.objects.create(
            id="1",
            name="[BYTE] Wanessa",
            username="wanessabezerra",
            birthday="2021-09-01",
            email="wanessaparelhas68@gmail.com",
            score=12.0,
            avatar="https://github.com/wanessabezerra.png",
            countCreatedTasks=1)

        # Get urls
        self.user = Users.objects.first()
        self.list_url = reverse('User-list')
        self.detail_url = reverse(
            'User-detail', kwargs={'pk': self.user.id})

    def test_users_list(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

    def test_users_detail(self):
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.user.id)
