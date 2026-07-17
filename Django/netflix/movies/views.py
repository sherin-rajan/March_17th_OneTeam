from django.shortcuts import render,redirect
from movies.models import Movies


# Create your views here.
def Home(request):
    return render(request,'index.html')

def Add_movie(request):
    if request.method=="POST":
        m=request.POST['name']
        Movies(movie=m).save()
        return redirect("/movies")
    return render(request,'add_movie.html')

def Movielist(request):
    movie=Movies.objects.all()
    return render(request,'movie_list.html',{'movie':movie})

