from django.urls import path
from api import views

urlpatterns=[
    path('list-create-todo',views.CreateListToDos.as_view()),
    path('update-delete-todo/<int:pk>',views.UpdateDeleteToDos.as_view())
]