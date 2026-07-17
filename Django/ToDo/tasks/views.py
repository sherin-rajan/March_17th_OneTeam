from django.shortcuts import render,redirect
from tasks.models import ToDos

# Create your views here.
def home(request):
    return render(request,'index.html')

def add_task(request):
    if request.method=="POST":
        t=request.POST['task']
        ToDos(task=t).save()
        return redirect('/all-tasks')
    return render(request,'add-task.html')

def all_tasks(request):
    my_task=ToDos.objects.all()
    return render(request,'all-tasks.html',{'data':my_task})

def updateTask(request,task_id):
    task=ToDos.objects.get(id=task_id)
    return render(request,"update-task.html",{'my_task':task})
