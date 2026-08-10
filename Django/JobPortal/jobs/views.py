from django.shortcuts import render

# Create your views here.
def allJobs(request):
    return render(request,'all-jobs.html')

def viewJobs(request):
    return render(request,'view_jobs.html')