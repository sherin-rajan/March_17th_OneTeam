from django.urls import path
from tasks import views

urlpattern=[path("home/",views.Home),
    path('',views.TextResponse)
    ]