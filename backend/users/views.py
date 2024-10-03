from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer
    filter_backends = [SearchFilter, DjangoFilterBackend]
    filterset_fields = ['is_active', 'is_admin']
    search_fields = ['username', 'email']
