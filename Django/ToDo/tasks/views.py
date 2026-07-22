from django.shortcuts import render,redirect
from tasks.models import ToDos
from django.contrib import messages

# Create your views here.

def add_task(request):
    if request.method=="POST":
        t=request.POST['task']
        ToDos(task=t).save()
        messages.success(request,'New task added successfuly')
        return redirect('/')
    return render(request,'add-task.html')

def all_tasks(request):
    my_task=ToDos.objects.all()
    return render(request,'all-tasks.html',{'data':my_task})

def updateTask(request,task_id):
    my_task=ToDos.objects.get(id=task_id)#fetching data by id
    if request.method=='POST': #when submitting -> 'post'
        t=request.POST['task']
        status=request.POST.get("status") 

        #status=request.POST.get("status",False) for value='True'
        #my_task.is_completed=status 

        if status:
            my_task.is_completed=True
        else:
            my_task.is_completed=False
        my_task.task=t #adding changes 
        my_task.save()
        messages.success(request,'Changes saved successfuly')
        return redirect('/')
    return render(request,"update-task.html",{'my_task':my_task})

def deleteTask(request,task_id):
    my_task=ToDos.objects.get(id=task_id)
    my_task.delete()
    return redirect("/")
