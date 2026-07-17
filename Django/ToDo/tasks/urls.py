from django.urls import path
from tasks import views

urlpatterns=[
    path('',views.home),
    path('addtask/',views.add_task),
    path('alltasks/',views.all_tasks)
]