from django.urls import path
from students import views

urlpatterns=[
    path('',views.home),
    path('add-details',views.addDetails)
]