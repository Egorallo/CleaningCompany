from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_POST
from cleaning.models import ServicePack, ServicePackInstance
from .cart import Cart
from newvision.models import Promo
from django.core.exceptions import PermissionDenied

@require_POST
def cart_add(request, servicepackinstance_id):
    if not request.user.is_authenticated:
        raise PermissionDenied("No access")

    cart = Cart(request)
    servicepackinstance = get_object_or_404(ServicePackInstance, id=servicepackinstance_id)

    # Check if the service pack instance is available
    if servicepackinstance.status != 'a':
        return redirect('cart:cart_detail')

    cart.add(servicepackinstance=servicepackinstance, quantity=1)
    servicepackinstance.status = 'o'
    servicepackinstance.save()
    return redirect('cart:cart_detail')

def cart_remove(request, servicepackinstance_id):
    if not request.user.is_authenticated:
        raise PermissionDenied("No access")

    cart = Cart(request)
    servicepackinstance = get_object_or_404(ServicePackInstance, id=servicepackinstance_id)
    cart.remove(servicepackinstance)
    servicepackinstance.status = 'a'
    servicepackinstance.save()
    return redirect('cart:cart_detail')

def cart_detail(request):
    if not request.user.is_authenticated:
        raise PermissionDenied("No access")
    cart = Cart(request)
    return render(request, 'cart/detail.html', {'cart': cart})

def apply_promo_code(request):
    promo_code = request.GET.get('promo_code', '')
    print(f"Received promo code: {promo_code}")
    discount = validate_promo_code(promo_code)
    return JsonResponse({'discount': discount})


def validate_promo_code(promo_code):
    try:
        promo = Promo.objects.get(code=promo_code)

        if not promo.is_archived:
            return promo.discount
        else:
            return 0

    except Promo.DoesNotExist:
        return False, 0
