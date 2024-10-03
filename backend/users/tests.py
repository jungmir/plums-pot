from rest_framework import status
from .models import User
from rest_framework.test import APIClient
from rest_framework.test import APITestCase

class UserAPITest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.valid_user_data = {
            "username": "testuser",
            "email": "test@example.com",
            "password": "test123!"
        }
        self.existing_user = User.objects.create(**self.valid_user_data)

    def test_get_all_users_success(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_user_success(self):
        response = self.client.get(f"/api/users/{self.existing_user.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["result"]["username"], self.valid_user_data["username"])
    
    def test_get_user_with_non_existent_id_failure(self):
        response = self.client.get("/api/users/999/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_user_success(self):
        new_user = {
            "username": "newuser",
            "email": "new@new.com",
            "password": "test123!"
        }
        response = self.client.post("/api/users/", new_user)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_create_user_with_invalid_password_failure(self):
        new_user = {
            "username": "newuser",
            "email": "new@new.com",
            "password": "test"
        }
        response = self.client.post("/api/users/", new_user)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_user_with_duplicate_username_and_email_failure(self):
        response = self.client.post("/api/users/", self.valid_user_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_user_update_success(self):
        updated_data = {
            "username": "update",
            "email": "update@update.com",
            "password": "test123!"
        }
        response = self.client.put(f"/api/users/{self.existing_user.id}/", updated_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.existing_user.refresh_from_db()
        self.assertEqual(self.existing_user.username, updated_data["username"])

    def test_user_delete_success(self):
        response = self.client.delete(f"/api/users/{self.existing_user.id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(User.objects.filter(id=self.existing_user.id).exists())

    def test_user_delete_with_non_existent_id_failure(self):
        response = self.client.delete("/api/users/999/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
