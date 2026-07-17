from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request,'index.html')

def add_task(request):
    return render(request,'add_task.html')

def all_tasks(request):
    return render(request,'all_tasks.html')
