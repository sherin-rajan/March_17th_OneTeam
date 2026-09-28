from rest_framework import serializers

from .models import Actors


class ActorCastMovieSerializer(serializers.Serializer):
    id = serializers.IntegerField(source='movie.id', read_only=True)
    title = serializers.CharField(source='movie.movie', read_only=True)
    poster = serializers.ImageField(source='movie.poster', read_only=True)
    release_date = serializers.DateField(source='movie.release_date', read_only=True)
    role = serializers.CharField(read_only=True)
    character_name = serializers.CharField(read_only=True)


class ActorSerializer(serializers.ModelSerializer):
    filmography = ActorCastMovieSerializer(source='cast_set', many=True, read_only=True)

    class Meta:
        model = Actors
        fields = ['id', 'name', 'place', 'picture', 'about', 'filmography']