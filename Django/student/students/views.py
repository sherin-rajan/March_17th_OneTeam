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
    if request.method=='POST':
        n=request.POST['name']
        e=request.POST['email']
        status=request.POST.get('status',False)
        data.is_active=status
        data.name=n
        data.email=e
        data.save()
        return redirect('/')
    return render(request,'update.html',{'data':data})

def delete(request,d_id):
    data=Details.objects.get(id=d_id)
    data.delete()
    return redirect('/')
    
