from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Actors
from .serializers import ActorSerializer


class ActorViewSet(viewsets.ModelViewSet):
    """Provide list, detail, create, update, and delete operations for actors."""

    queryset = Actors.objects.all().order_by('name')
    serializer_class = ActorSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]