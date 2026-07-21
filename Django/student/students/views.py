from django.shortcuts import render,redirect
from students.models import Details

# Create your views here.
def home(request):
    details=Details.objects.all()
    return render(request,'index.html',{'data':details})

def addDetails(request):
    if request.method=='POST':
        n=request.POST['name']
        e=request.POST['email']
        Details(name=n, email=e).save()
        return redirect('/')
    return render(request,'add-details.html')

def update(request,d_id):
    data=Details.objects.get(id=d_id)
    return render(request,'update.html',{'date':data})