from django.urls import path
from tasks import views

urlpatterns=[
    path('',views.home),
    path('add-task/',views.add_task),
    path('all-tasks/',views.all_tasks)
]