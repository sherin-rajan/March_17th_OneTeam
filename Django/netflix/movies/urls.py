from django.urls import path
from movies import views

urlpatterns=[
    path('',views.home),
    path('add-category',views.addCategory),
    path('all-movies/',views.allMovies),
    path('movie-detail/<int:movie_id>',views.movieDetails),
    path('delete-movie/<int:movie_id>',views.deleteMovie)
]