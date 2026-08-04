from django.shortcuts import render,redirect
from movies.models import Category,Movies,Cast
from django.http import HttpResponse
from movies.form import CastForm,ReviewForm


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
    actors=m.casts.filter(role=Cast.Role.ACTOR)
    director=m.casts.filter(role=Cast.Role.DIRECTOR)
    producer=m.casts.filter(role=Cast.Role.PRODUCER)
    if request.method=='POST':
        form=ReviewForm(request.POST)
        if form.is_valid():
            review=form.save(commit=False)
            review.movie=m
            review.save()
    form=ReviewForm()
    context={
            'cinema':m,
            'actor':actors,
            'director':director,
            'producer':producer,
            'form':form
        }
    return render(request,'movie-detail.html',context)

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

def updateMovie(request,movie_id):
    categories=Category.objects.all()
    m=Movies.objects.get(id=movie_id)
    if request.method=='POST':
        m.movie=request.POST['movie']
        cat=request.POST['category']
        m.release_date=request.POST['release_date']
        m.description=request.POST['description']
        m.poster=request.FILES['poster']
        m.trailer_link=request.POST['trailer_link']
        c=Category.objects.get(id=cat)
        m.category=c
        m.save()
        return redirect('/all-movies')
    return render(request,'update-movie.html',{'cinema':m,'cats':categories})

def addCast(request):
    if request.method=='POST':
        cast_form=CastForm(request.POST)
        if cast_form.is_valid():
            cast_form.save()
            return HttpResponse("New Cast Added")
    else:
        cast_form=CastForm()
        return render(request,"add-cast.html",{"my_form":cast_form})