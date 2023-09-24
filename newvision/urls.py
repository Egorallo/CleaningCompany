from django.urls import path
from . import views

app_name = 'newvision'

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('news/', views.news, name='news'),
    path('questions/', views.questions, name='questions'),
    path('reviews/', views.reviews, name='reviews'),
    path('contacts/', views.contacts, name='contacts'),
    path('policy/', views.policy, name='policy'),
    path('promos/', views.promos, name='promos'),
    path('news/<int:news_id>/', views.news_detail, name='news_detail'),

]