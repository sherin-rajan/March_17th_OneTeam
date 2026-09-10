from rest_framework import serializers
from tasks.models import ToDos

class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model=ToDos
        fields='__all__'
