from django.shortcuts import render,redirect
from tasks.models import ToDos

# Create your views here.
def home(request):
    return render(request,'index.html')

def add_task(request):
    if request.method=="POST":
        t=request.POST['task']
        ToDos(task=t).save()
        return redirect('/all_tasks')
    return render(request,'add_task.html')

def all_tasks(request):
    my_task=ToDos.objects.all()
    return render(request,'all_tasks.html',{'data':my_task})
