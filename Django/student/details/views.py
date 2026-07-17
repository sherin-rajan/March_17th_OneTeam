from django.shortcuts import render,redirect
from details.models import StudentSystem

# Create your views here.
def home(request):
    return render(request,'index.html')

def add_details(request):
    if request.method=="POST":
        n=request.POST['name']
        StudentSystem(name=n).save()
        return redirect('/details')
    return render(request,'add_details.html')

def details(request):
    d=StudentSystem.objects.all()
    return render(request,'details.html',{'data':d})
