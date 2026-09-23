from rest_framework import serializers

from .models import Cast, Category, Movies, Review


class CategorySerializer(serializers.ModelSerializer):
    """Serialize movie categories while letting the model generate the slug."""

    class Meta:
        model = Category
        fields = ['id', 'category', 'slug']
        read_only_fields = ['slug']


class CastSerializer(serializers.ModelSerializer):
    """Serialize a cast assignment with the actor's display name included."""

    actor_name = serializers.CharField(source='actor.name', read_only=True)

    class Meta:
        model = Cast
        fields = ['id', 'movie', 'role', 'actor', 'actor_name', 'character_name']


class ReviewSerializer(serializers.ModelSerializer):
    """Serialize reviews and prevent clients from impersonating another user."""

    class Meta:
        model = Review
        fields = ['id', 'movie', 'username', 'rating', 'comment', 'date']
        read_only_fields = ['username', 'date']

    def validate_rating(self, value):
        """Keep ratings within the five-star range shown by the website."""
        if not 1 <= value <= 5:
            raise serializers.ValidationError('Rating must be between 1 and 5.')
        return value


class MovieSerializer(serializers.ModelSerializer):
    """Serialize a movie with its category, cast, and reviews included."""

    category_name = serializers.CharField(source='category.category', read_only=True)
    casts = CastSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Movies
        fields = [
            'id', 'movie', 'category', 'category_name', 'description',
            'release_date', 'poster', 'created_date', 'trailer_link',
            'casts', 'reviews',
        ]
        read_only_fields = ['created_date']