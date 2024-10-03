import logging
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.exceptions import ValidationError
from rest_framework import status

logger = logging.getLogger('users')

class CustomExceptionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        try:
            response = self.get_response(request)
        except Exception as e:
            print("Exception caught in __call__")
            return self.process_exception(request, e)
        return response

    def process_exception(self, request, exception):
        logger.error("Exception caught in middleware")
        if isinstance(exception, ValidationError):
            return JsonResponse({
                'error': 'Validation failed',
                'details': exception.detail
            }, status=status.HTTP_400_BAD_REQUEST)
        elif isinstance(exception, ObjectDoesNotExist):
            return JsonResponse({
                'error': 'Requested object not found'
            }, status=status.HTTP_404_NOT_FOUND)
        else:
            return JsonResponse({
                'error': 'An unexpected error occurred. Please try again later.'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)