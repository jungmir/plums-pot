from django.contrib import admin
from django.urls import path, include
from users.views import home_redirect

urlpatterns = [
    path('/', home_redirect),
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
]
