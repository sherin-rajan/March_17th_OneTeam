from django.urls import path
from details import views

urlpatterns=[
    path('home/',views.home),
    path('contact',views.contact)
]