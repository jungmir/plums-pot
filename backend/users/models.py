from django.db import models

class User(models.Model):
    # 사용자 id
    id = models.AutoField(primary_key=True)
    
    # 로그인 아이디
    username = models.CharField(max_length=150, unique=True)
    
    # 사용자 이름
    name = models.CharField(max_length=100)
    
    # 관리자 여부
    is_admin = models.BooleanField(default=False)

    # 디버깅 용이성
    def __str__(self):
        return self.username