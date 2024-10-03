from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from rest_framework import status

User = get_user_model()

class UserAPITestCase(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username='user1', email='user1@wire.com', password='password157')
        self.user2 = User.objects.create_user(username='user2', email='user2@wire.com', password='password157')

    #테스트 후 사용자 삭제
    def tearDown(self):
        User.objects.all().delete()

    #전체 사용자 조회 테스트
    def test_get_all_users(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 2)

    #특정 사용자 검색 테스트
    def test_search_user(self):
        response = self.client.get('/api/users/?search=user1')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['username'], 'user1')

    #사용자 수정 테스트
    def test_update_user(self):
        data = {'email': 'newemail@example.com', 'username': self.user1.username}
        response = self.client.put(f'/api/users/{self.user1.id}/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user1.refresh_from_db()
        self.assertEqual(self.user1.email, 'newemail@example.com')

    #사용자 삭제 테스트
    def test_delete_user(self):
        response = self.client.delete(f'/api/users/{self.user1.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(User.objects.count(), 1)

    #페이지네이션 테스트
    def test_pagination(self):
        response = self.client.get('/api/users/?page=1')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data['results']), 1)

    #유효하지 않은 사용자 수정 요청 테스트
    def test_invalid_update_user(self):
        data = {'email': 'invalid-email'}
        response = self.client.put(f'/api/users/{self.user1.id}/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)