from django.urls import path
from tasks import views

urlpatterns=[
    path('',views.all_tasks),
    path('add-task/',views.add_task),
    path('update-task/<int:task_id>',views.updateTask),
    path('delete-task/<int:task_id>',views.deleteTask)
]