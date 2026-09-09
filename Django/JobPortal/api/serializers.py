from rest_framework import serializers
from jobs.models import Sectors

class SectorSerializer(serializers.ModelSerializer):
    class Meta:
        model=Sectors
        fields=["id","name"]