from django.urls import path
from tasks import views

urlpatterns=[
    path('',views.home),
    path('add_task/',views.add_task),
    path('all_tasks/',views.all_tasks)
]