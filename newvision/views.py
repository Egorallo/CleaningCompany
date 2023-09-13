from django.shortcuts import render

def home(request):
    return render(request, 'newvision/home.html')

def about(request):
    return render(request, 'newvision/about.html')