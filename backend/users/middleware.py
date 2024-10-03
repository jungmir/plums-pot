import logging
from django.http import JsonResponse
from rest_framework import status

logger = logging.getLogger(__name__)

class ErrorHandlingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_exception(self, request, exception):
        """
        예외가 발생했을 때 호출되는 메서드
        모든 예외를 잡아서 로깅하고, 일관된 에러 응답을 반환.
        """
        logger.exception("예기치 않은 오류 발생")
        return JsonResponse({
            "error": str(exception),
            "detail": "예기치 않은 오류가 발생했습니다. 나중에 다시 시도해 주세요."
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)