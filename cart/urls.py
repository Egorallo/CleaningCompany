from django.urls import path
from . import views

app_name = 'cart'

urlpatterns = [
    path('', views.cart_detail, name='cart_detail'),
    path('add/<uuid:servicepackinstance_id>/', views.cart_add, name='cart_add'),
    path('remove/<uuid:servicepackinstance_id>/', views.cart_remove, name='cart_remove'),
    path('apply_promo_code/', views.apply_promo_code, name='apply_promo_code'),
]
