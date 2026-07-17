from django.urls import path
from details import views

urlpatterns=[
    path('',views.home),
    path('add_details/',views.add_details),
    path('details/',views.details)
]