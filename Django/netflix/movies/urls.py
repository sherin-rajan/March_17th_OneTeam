from django.urls import path
from movies import views

urlpatterns=[
    path('',views.home,name='home'),
    path('add-category/',views.addCategory,name='add_category'),
    path('all-movies/',views.allMovies,name='all_movies'),
    path('movie-detail/<int:movie_id>',views.movieDetails,name='movie_details'),
    path('delete-movie/<int:movie_id>',views.deleteMovie,name='delete_movie'),
    path('add-movie/',views.addMovies,name='add_movie'),
    path('update-movie/<int:movie_id>',views.updateMovie,name='update_movie'),
    path('add-cast/',views.addCast,name='add_cast'),
    path('cast-details/<int:id>',views.castDetails,name='cast_details')
]