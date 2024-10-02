import logging
from django.http import JsonResponse

logger = logging.getLogger(__name__)

class CustomErrorMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        try:
            response = self.get_response(request)
        except Exception as e:
            logger.error(f"Error: {str(e)}")
            return JsonResponse({'error': str(e)}, status=500)
        return response
