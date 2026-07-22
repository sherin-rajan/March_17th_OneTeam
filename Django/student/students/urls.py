from django.urls import path
from students import views

urlpatterns=[
    path('',views.home),
    path('add-details',views.addDetails),
    path('update/<int:d_id>',views.update),
    path('delete/<int:d_id>',views.delete)
]