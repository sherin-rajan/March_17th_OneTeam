from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.serializers import ToDoSerializer
from tasks.models import ToDos

# Create your views here.
@api_view(["GET","POST"])
def todo_list_create(request):
    if request.method=='GET':
        todos=ToDos.objects.all()
        serializer=ToDoSerializer(todos,many=True)
        return Response(serializer.data)
    elif request.method=='POST':
        serializer=ToDoSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)



