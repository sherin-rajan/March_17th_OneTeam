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

@api_view(["GET", "PATCH", "PUT", "DELETE"])
def todo_get_update_delete(request, pk):

    try:
        todo=ToDos.objects.get(pk=pk)
    except ToDos.DoesNotExist:
        return Response({"error": "Todo not found"},status=status.HTTP_404_NOT_FOUND)

    # GET - retrieve one todo
    if request.method=="GET":
        serializer=ToDoSerializer(todo)
        return Response(serializer.data)

    #for status updation in react(using patch there)
    elif request.method=="PATCH":
        serializer=ToDoSerializer(todo,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    # PUT - update one todo
    elif request.method=="PUT":
        serializer=ToDoSerializer(todo, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    # DELETE - delete one todo
    elif request.method=="DELETE":
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
