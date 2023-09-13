from django.urls import path
from . import views

app_name = 'newvision'

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about')
]