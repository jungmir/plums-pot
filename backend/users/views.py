from rest_framework import viewsets, filters, status
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import User
from .serializers import UserSerializer
from .pagination import StandardResultsSetPagination
import logging

logger = logging.getLogger(__name__)

# ModelViewSet: 모델 데이터의 CRUD 기능을 제공

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = StandardResultsSetPagination
    
    # 필터링과 검색 기능을 위한 필터 백엔드 설정
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    
    # 'username', 'name', 'is_admin' 필드로 필터링 가능
    # 예: /api/users/?username=john&is_admin=true
    filterset_fields = ['username', 'name', 'is_admin']
    
    # 'username'과 'name' 필드로 검색 가능
    # 예: /api/users/?search=john
    search_fields = ['username', 'name']

    # 사용자 전체 목록 조회
    # get/users/
    def list(self, request, *args, **kwargs):
        """
        페이지네이션, 필터링, 검색 기능이 적용.
        """
        logger.info(f"Listing users with params: {request.query_params}")
        return super().list(request, *args, **kwargs)

    # 특정 사용자 상세 정보 조회
    # get/users/1/
    def retrieve(self, request, *args, **kwargs):
        """
        특정 사용자의 상세 정보를 조회합니다.
        예: /api/users/1/
        """
        logger.info(f"Retrieving user with id: {kwargs.get('pk')}")
        return super().retrieve(request, *args, **kwargs)

    # 사용자 정보 수정
    # put/users/1/
    def update(self, request, *args, **kwargs):
        """
        사용자의 정보를 수정합니다.
        예: /api/users/1/
        """
        logger.info(f"Updating user with id: {kwargs.get('pk')}")
        return super().update(request, *args, **kwargs)

    # 사용자 삭제
    # delete/users/1/
    def destroy(self, request, *args, **kwargs):
        """
        사용자를 삭제합니다.
        예: /api/users/1/
        """
        logger.info(f"Deleting user with id: {kwargs.get('pk')}")
        return super().destroy(request, *args, **kwargs)