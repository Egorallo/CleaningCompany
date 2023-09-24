from django.shortcuts import render

def home(request):
    return render(request, 'newvision/home.html')

def about(request):
    return render(request, 'newvision/about.html')

def news(request):
    return render(request, 'newvision/news.html')

def questions(request):
    return render(request, 'newvision/questions.html')

def reviews(request):
    return render(request, 'newvision/reviews.html')

def contacts(request):
    return render(request, 'newvision/contacts.html')

def policy(request):
    return render(request, 'newvision/policy.html')

def promos(requset):
    return render(requset, 'newvision/promos.html')