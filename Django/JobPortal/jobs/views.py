from django.shortcuts import render,redirect
from jobs.models import Jobs,Sectors,Applications
from jobs.forms import JobForm
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib import auth
from django.contrib.auth.decorators import login_required

# Create your views here.

#custom decorator
def admin_permission(fun):
    def wrapper(request,*args,**kwargs):
        if request.user.is_superuser:
            return fun(request,*args,**kwargs)
        else:
            messages.error(request,"Permission denied!")
            return redirect("all_jobs")
    return wrapper

def home(request):
    return render(request,'home.html')

def dashboard(request):
    return render(request,'dashboard.html')

@login_required
def allJobs(request,sector=None):
    if sector:
        job_posts=Jobs.objects.filter(sector__id=sector)
    else:
        job_posts=Jobs.objects.all() 
    return render(request,"all-jobs.html",{'jobs':job_posts}) 
   
@login_required
def jobDetail(request,job_id):
    job=Jobs.objects.get(id=job_id)
    return render(request,"job-detail.html",{"job":job})

@admin_permission
def addJob(request):
    if request.POST:
        form=JobForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("/")
    else:
        form=JobForm()
    return render(request,"add-jobs.html",{"form":form})

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

def applyJob(request,job_id):
    user=User.objects.get(id=request.user.id) #id of the logged user
    job=Jobs.objects.get(id=job_id)
    Applications(user=user,job=job).save()
    return redirect('all_jobs')

def signIn(request):
    if request.method=='POST':
        username=request.POST['username']
        password=request.POST['password']
        user=auth.authenticate(username=username,password=password)
        if user is not None:
            auth.login(request,user)
            return redirect('dashboard')
        else:
            messages.error(request,'Invalid username or password!')
            return redirect('login')
    return render(request,'login.html')

def signUp(request):
    if request.method=="POST":
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        email = request.POST['email']
        password = request.POST['password']
        if User.objects.filter(username=email).exists():
            messages.info(request,'User already exist! Please login!')
            return redirect('login')
        else:
            user=User.objects.create_user(username=email,first_name=first_name,last_name=last_name,email=email,password=password)
            user.save()
            messages.success(request,'Welcome to JobsPortal! Please login to contonue!')
            return redirect('login')
    return render(request,'register.html')

def signOut(request):
    auth.logout(request)
    return redirect('all_jobs')