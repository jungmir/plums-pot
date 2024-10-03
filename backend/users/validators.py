from django.core.exceptions import ValidationError
import re

def validate_username(value):
    if not re.match("^[a-zA-Z0-9_]*$", value):
        raise ValidationError(
            "Username can only contain letters, numbers, and underscores."
        )

def validate_password(value):
    if not re.fullmatch(r'^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$', value):
        raise ValidationError(
            "비밀번호는 최소 8자 이상이어야 하며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다."
        )