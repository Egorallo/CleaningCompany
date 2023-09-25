from django.shortcuts import render, redirect
from django.urls import reverse
from django.views.generic import ListView
from .forms import ReviewForm

from .models import News, Promo, Review
def home(request):
    latest_news = News.objects.latest('pub_date')
    context = {'latest_news': latest_news}
    return render(request, 'newvision/home.html', context)
def about(request):
    return render(request, 'newvision/about.html')

def vacancies(request):
    return render(request, 'newvision/vacancies.html')
def questions(request):
    return render(request, 'newvision/questions.html')

def reviews(request):
    reviews = Review.objects.all()
    form = ReviewForm()

    if request.method == 'POST':
        form = ReviewForm(request.POST)
        if form.is_valid():
            new_review = Review(
                reviewer_name=request.user.username,  # Get the username of the logged-in user
                rating=form.cleaned_data['rating'],
                text=form.cleaned_data['text']
            )
            new_review.save()
            return redirect('newvision:reviews')

    return render(request, 'newvision/reviews.html', {'reviews': reviews, 'form': form})

class ReviewListView(ListView):
    model = Review
    template_name = 'newvision/reviews.html'
    context_object_name = 'reviews'

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