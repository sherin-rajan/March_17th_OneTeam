from django.urls import path
from jobs import views

urlpatterns=[
    path('',views.allJobs,name='all_jobs'),
    path('view_jobs',views.viewJobs,name='view_jobs')
]