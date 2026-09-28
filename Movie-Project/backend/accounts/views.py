from django.shortcuts import render,redirect
from django.urls import path
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import auth

# Create your views here.
def signIn(request):
    if request.method=='POST':
        username=request.POST['username']
        password=request.POST['password']
        user=auth.authenticate(username=username,password=password)
        if user is not None:
            auth.login(request,user)
            return redirect('all_movies')
    return render(request,'login.html')

def signUp(request):
    if request.method=='POST':
        f_name=request.POST['first_name']
        l_name=request.POST['last_name']
        email=request.POST['email']
        password=request.POST['password1']
        c_password=request.POST['password2']
        if password==c_password:
            if User.objects.filter(username=email).exists():
                return HttpResponse('Email already exists')
            else:
                user=User.objects.create_user(username=email,first_name=f_name,last_name=l_name,password=password,email=email)
                user.save()
                return redirect('login')
        else:
            return HttpResponse("Password and cofirm password must be same")
    return render(request,'register.html')

def signOut(request):
    auth.logout(request)
    return redirect('home')

