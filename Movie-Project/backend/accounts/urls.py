from django.urls import path
from accounts import views

urlpatterns=[
    path('',views.signIn,name='login'),
    path('register',views.signUp,name='register'),
    path('logout',views.signOut,name='logout')
]