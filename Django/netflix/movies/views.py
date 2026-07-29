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

def addMovies(request):
    categories=Category.objects.all()
    if request.method=='POST':
        m=request.POST['movie']
        cat=request.POST['category']
        r_date=request.POST['release_date']
        des=request.POST['description']
        p=request.FILES['poster']
        t=request.POST['trailer_link']
        category=Category.objects.get(id=cat)
        Movies(movie=m,category=category,release_date=r_date,description=des,poster=p,trailer_link=t).save()
        return redirect('/all-movies')
    return render(request,'add-movie.html',{'cats':categories})
