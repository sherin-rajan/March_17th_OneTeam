from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from .models import Cast, Category, Movies, Review
from .serializers import (
    CastSerializer,
    CategorySerializer,
    MovieSerializer,
    ReviewSerializer,
)


class CategoryViewSet(viewsets.ModelViewSet):
    """Provide CRUD operations for movie categories."""

    queryset = Category.objects.all().order_by('category')
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class MovieViewSet(viewsets.ModelViewSet):
    """Provide CRUD operations for movies and optimize related data loading."""

    queryset = Movies.objects.select_related('category').prefetch_related('casts', 'reviews')
    serializer_class = MovieSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class CastViewSet(viewsets.ModelViewSet):
    """Provide CRUD operations for movie-to-actor cast assignments."""

    queryset = Cast.objects.select_related('movie', 'actor').all()
    serializer_class = CastSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ReviewViewSet(viewsets.ModelViewSet):
    """Allow public review reading while requiring authentication to create reviews."""

    queryset = Review.objects.select_related('movie').all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        """Store the authenticated username instead of trusting request data."""
        serializer.save(username=self.request.user.username)

    def create(self, request, *args, **kwargs):
        """Return an explicit unauthorized response for anonymous review creation."""
        if not request.user.is_authenticated:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        return super().create(request, *args, **kwargs)