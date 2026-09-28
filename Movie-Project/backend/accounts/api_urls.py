from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .api_views import CurrentUserAPIView, MyTokenObtainPairView, RegisterAPIView

urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='api_register'),
    path('login/', MyTokenObtainPairView.as_view(), name='api_login'),
    path('refresh/', TokenRefreshView.as_view(), name='api_token_refresh'),
    path('me/', CurrentUserAPIView.as_view(), name='api_current_user'),
]