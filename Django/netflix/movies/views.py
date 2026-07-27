from django.shortcuts import render,redirect
from movies.models import Category
from django.http import HttpResponse
from movies.models import Movies


# Create your views here.
def home(request):
    return render(request,'index.html')

def addCategory(request):
    if request.method=='POST':
        cat=request.POST['category']
        Category(category=cat).save()
        return HttpResponse("New category added")
    return render(request,'add-category.html')

def allMovies(request):
    m=Movies.objects.all()
    return render(request,'all-movies.html',{'movies':m})
    
def movieDetails(request,movie_id):
    m=Movies.objects.get(id=movie_id)
    return render(request,'movie-detail.html',{'cinema':m})

def deleteMovie(request,movie_id):
    m=Movies.objects.get(id=movie_id)
    m.delete()
    return redirect('/all-movies/')