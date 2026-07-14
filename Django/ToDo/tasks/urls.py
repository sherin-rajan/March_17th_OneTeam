from django.urls import path
from tasks import views

urlpatterns=[
    path("home/",views.Home),
    path('',views.TextResponse),
    path("add/",views.Add)
]