from django.test import TestCase
from .models import User
from rest_framework.test import APIClient

class UserAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(username="testuser", email="testuser@test.com")

    def test_get_users(self):
        response = self.client.get('/users/')
        self.assertEqual(response.status_code, 200)

    def test_create_user(self):
        response = self.client.post('/users/', {
            'username': 'newuser', 'email': 'newuser@test.com', 'is_active': True
        })
        self.assertEqual(response.status_code, 201)
