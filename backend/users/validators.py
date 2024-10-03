from django.core.exceptions import ValidationError
import re

def validate_username(value):
    if not re.match("^[a-zA-Z0-9_]*$", value):
        raise ValidationError(
            "Username can only contain letters, numbers, and underscores."
        )

def validate_password(value):
    if not re.fullmatch(r'^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#^$!%*?&])[A-Za-z\d#^@$!%*?&]{8,}$', value):
        raise ValidationError(
            "Password must be at least 8 characters long and include letters, numbers, and special characters."
        )