from django.shortcuts import render,redirect
from jobs.models import Jobs,Sectors
from jobs.forms import JobForm
# Create your views here.

def allJobs(request,sector=None):
    all_sectors=Sectors.objects.all()
    if sector:
        job_posts=Jobs.objects.filter(sector__id=sector)
    else:
        job_posts=Jobs.objects.all() 
    return render(request,"all-jobs.html",{'jobs':job_posts,"sectors":all_sectors}) 
   

def jobDetail(request,job_id):
    job=Jobs.objects.get(id=job_id)
    return render(request,"job-detail.html",{"job":job})


def addJob(request):
    if request.POST:
        form=JobForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("/")
    else:
        form=JobForm()
    return render(request,"add-job.html",{"form":form})

def updateJob(request,job_id):
    job=Jobs.objects.get(id=job_id)
    if request.method=="POST":
        form=JobForm(request.POST,instance=job)
        if form.is_valid():
            form.save()
            return redirect("job_detail",job_id)
    else:
        form=JobForm(instance=job)
    return render(request,"update-job.html",{"form":form})