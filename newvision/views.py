from django.shortcuts import render
from django.urls import reverse
from .models import News, Promo
def home(request):
    latest_news = News.objects.latest('pub_date')
    context = {'latest_news': latest_news}
    return render(request, 'newvision/home.html', context)
def about(request):
    return render(request, 'newvision/about.html')
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

def news(request):
    all_news = News.objects.all().order_by('-pub_date')
    return render(request, 'newvision/news.html', {'all_news': all_news})

def news_detail(request, news_id):
    news = News.objects.get(pk=news_id)
    return render(request, 'newvision/news_detail.html', {'news': news})

def promos(request):
    active_promos = Promo.objects.filter(is_archived=False)
    archived_promos = Promo.objects.filter(is_archived=True)

    context = {
        'active_promos': active_promos,
        'archived_promos': archived_promos,
    }

    return render(request, 'newvision/promos.html', context)