from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def TextResponse(request):
    return HttpResponse("Hello Developer!!!")

def Home(request):
    return render(request,"index.html")
