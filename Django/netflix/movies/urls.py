from django.urls import path
from movies import views

urlpatterns=[
    path('',views.Home),
    path('add_movie/',views.Add_movie),
    path('movies/',views.Movielist)
]