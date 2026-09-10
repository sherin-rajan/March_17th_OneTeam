from django.urls import path
from api import views

urlpatterns=[
    path('list-create-todo',views.todo_list_create)
]