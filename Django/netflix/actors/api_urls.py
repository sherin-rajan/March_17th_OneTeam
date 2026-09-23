from rest_framework.routers import DefaultRouter

from .api_views import ActorViewSet


router = DefaultRouter()
router.register('actors', ActorViewSet, basename='api_actor')

urlpatterns = router.urls