from django.urls import path
from movies import views

urlpatterns=[
    path('home/',views.Home),
    path('about/',views.About),
    path('movies/',views.Movielist)
]