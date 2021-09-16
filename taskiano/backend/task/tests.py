from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from task.models import Users


class UsersTests(APITestCase):
    def test_create_users(self):
        url = reverse('User-list')
        data = {
            "id": "1",
            "name": "[BYTE] Wanessa",
            "username": "wanessabezerra",
            "birthday": "2021-09-01",
            "email": "wanessaparelhas68@gmail.com",
            "score": 12.0,
            "avatar": "https://github.com/wanessabezerra.png",
            "countCreatedTasks": 1
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Users.objects.count(), 1)
        self.assertEqual(Users.objects.get().id, '1')

# ou


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

    def test_users_create_not_allowed(self):
        response = self.client.post(self.list_url)
        self.assertEqual(response.status_code,
                         status.HTTP_400_BAD_REQUEST)

    def test_users_delete_not_allowed(self):
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code,
                         status.HTTP_204_NO_CONTENT)

    def test_users_update_not_allowed(self):
        response = self.client.put(self.detail_url)
        self.assertEqual(response.status_code,
                         status.HTTP_400_BAD_REQUEST)

    def test_users_partial_update_not_allowed(self):
        response = self.client.patch(self.detail_url)
        self.assertEqual(response.status_code,
                         status.HTTP_200_OK)
