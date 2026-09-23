from rest_framework.routers import DefaultRouter

from .api_views import CastViewSet, CategoryViewSet, MovieViewSet, ReviewViewSet


router = DefaultRouter()
router.register('categories', CategoryViewSet, basename='api_category')
router.register('movies', MovieViewSet, basename='api_movie')
router.register('cast', CastViewSet, basename='api_cast')
router.register('reviews', ReviewViewSet, basename='api_review')

urlpatterns = router.urls