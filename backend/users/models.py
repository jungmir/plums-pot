from django.contrib.auth.models import AbstractUser
from django.db import models
from .validators import validate_username, validate_password

class User(AbstractUser):
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    username = models.CharField(
        max_length=10,
        unique=True,
        validators=[validate_username],
    )
    email = models.EmailField(unique=True)
    password = models.CharField(
        max_length=16,
        validators=[validate_password],
    )