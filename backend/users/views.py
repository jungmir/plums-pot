import logging
from rest_framework import viewsets, filters, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from rest_framework.pagination import PageNumberPagination
from .serializers import UserSerializer
from django.shortcuts import redirect
from django.http import HttpResponse

User = get_user_model()
def home_redirect(request):
    return redirect('/api/users/')

logger = logging.getLogger('users')

#페이지네이션 설정
class UserPagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 100

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = UserPagination

    #검색 필터링 설정
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['username', 'email']
    ordering_fields = ['date_joined', 'username']

    #사용자 목록 가져오는 함수
    def list(self, request, *args, **kwargs):
        logger.info('Fetching all users with pagination.')
        return super().list(request, *args, **kwargs)
    
    #사용자 수정 함수
    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            logger.info(f'User with ID {kwargs["pk"]} has been updated.')
            return Response(serializer.data, status=status.HTTP_200_OK)
        logger.warning(f'Failed to update user with ID {kwargs["pk"]}. Invalid data provided.')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #사용자 삭제 함수
    def destroy(self, request, *args, **kwargs):
        user = self.get_object()
        user.delete()
        logger.info(f'User with ID {kwargs["pk"]} has been deleted.')
        return Response(status=status.HTTP_204_NO_CONTENT)