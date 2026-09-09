from django.shortcuts import render
from api.serializers import ToDoSerializer
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView
from tasks.models import ToDos

# Create your views here.

class CreateListToDos(ListCreateAPIView):
    queryset=ToDos.objects.all()
    serializer_class=ToDoSerializer

class UpdateDeleteToDos(RetrieveUpdateDestroyAPIView):
    queryset=ToDos.objects.all()
    serializer_class=ToDoSerializer
