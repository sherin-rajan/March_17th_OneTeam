from django.shortcuts import render
from api.serializers import SectorSerializer
from jobs.models import Sectors
from rest_framework.generics import ListAPIView

# Create your views here.
class SectorSerializer(ListAPIView):
    queryset=Sectors.objects.all()
    serializer_class=SectorSerializer
