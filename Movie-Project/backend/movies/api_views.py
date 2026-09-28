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
        """Return an explicit unauthorized response for anonymous review creation,
        or update if the user has already reviewed the movie."""
        if not request.user.is_authenticated:
            return Response({'detail': 'Authentication required.'}, status=status.HTTP_401_UNAUTHORIZED)
        movie_id = request.data.get('movie')
        if movie_id:
            existing = Review.objects.filter(movie_id=movie_id, username=request.user.username).first()
            if existing:
                serializer = self.get_serializer(existing, data=request.data, partial=True)
                serializer.is_valid(raise_exception=True)
                serializer.save(username=request.user.username)
                return Response(serializer.data, status=status.HTTP_200_OK)
        return super().create(request, *args, **kwargs)