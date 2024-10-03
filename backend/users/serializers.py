from rest_framework import serializers
from .models import User

# serializers := Json Converter
class UserSerializer(serializers.ModelSerializer):
    # UserSerializer의 동작을 구성하기 위한 메타데이터
    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'is_admin']
        # id 필드는 읽기 전용으로 설정 (자동 생성)
        read_only_fields = ['id']