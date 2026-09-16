from django.urls import path
from api import views

urlpatterns=[
    path('list-create-todo',views.todo_list_create),
    path('get-update-delete-todo/<int:pk>',views.todo_get_update_delete)
]