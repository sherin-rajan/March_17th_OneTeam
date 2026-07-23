from django.shortcuts import render,redirect
from movies.models import Category
from django.http import HttpResponse


# Create your views here.
def addCategory(request):
    if request.method=='POST':
        cat=request.POST['category']
        Category(category=cat).save()
        return HttpResponse("New category added")
    return render(request,'add-category.html')
