from django.urls import path
from .views import task_list_create,task_details

urlpatterns=[
    path('list-create/',task_list_create),
    path('details/<int:pk>/',task_details)
]