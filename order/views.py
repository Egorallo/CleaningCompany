from django.db.models import Sum, Count, F, OuterRef, Subquery
from django.db.models.functions import TruncDate
from django.db import models
from django.shortcuts import render, redirect
from django.views import generic
from cleaning.models import ServicePack
from .models import OrderItem
from cart.cart import Cart
from .models import Order, OrderItem
from django.core.exceptions import PermissionDenied
from statistics import mean, mode, median
from collections import Counter
import logging
import matplotlib
from matplotlib import pyplot as plt
logger = logging.getLogger(__name__)



def order_create(request):
    if not request.user.is_authenticated:
        raise PermissionDenied("No access")

    cart = Cart(request)

    if cart.get_total_price() == 0:
        return redirect('cart:cart_detail')

    if request.method == 'POST':
        order = Order.objects.create(client=request.user.username)
        for item in cart:
            servicepackinstance = item['servicepackinstance']
            OrderItem.objects.create(
                order=order,
                servicepackinstance=servicepackinstance,
                price=item['price'],
                quantity=item['quantity']
            )
            servicepackinstance.purchase_count += item['quantity']
            servicepackinstance.status = 'o'

            servicepackinstance.save()

        cart.clear()
        logger.info("New order has been posted")
        return render(request, 'order/created.html', {'order': order})

    return render(request, 'order/create.html', {'cart': cart})


class OrderListView(generic.ListView):
    model = Order
    template_name = 'order/order_list.html'

    orderitem_subquery = OrderItem.objects.filter(order_id=OuterRef('id')).values('order_id').annotate(
        total_price=Sum(F('price'))
    ).values('total_price')

    result = Order.objects.annotate(day=TruncDate('created')).values('day').annotate(
        order_count=Count('id'),
        total_order_price=Subquery(orderitem_subquery, output_field=models.DecimalField())
    ).order_by('day')

    # dates = [item['day'] for item in result]
    # order_counts = [item['order_count'] for item in result]
    # total_order_prices = [item['total_order_price'] or 0 for item in result]
    grouped_dates = {}
    grouped_order_counts = {}
    grouped_total_order_prices = {}

    for item in result:
        day = item['day']
        order_count = item['order_count']
        total_order_price = item['total_order_price']

        if day in grouped_dates:
            grouped_order_counts[day] += order_count
            grouped_total_order_prices[day] += total_order_price
        else:
            grouped_dates[day] = day
            grouped_order_counts[day] = order_count
            grouped_total_order_prices[day] = total_order_price
    for day, order_count in grouped_order_counts.items():
        total_order_price = grouped_total_order_prices[day]
        print(f"Day: {day}, Order Count: {order_count}, Total Order Price: {total_order_price}")

    dates = list(grouped_dates.keys())
    total_order_prices = list(grouped_total_order_prices.values())

    matplotlib.pyplot.switch_backend('Agg')
    plt.plot(dates, total_order_prices, marker='o', linestyle='-')
    plt.xlabel('Date')
    plt.ylabel('Total Order Price')
    plt.title('Total Order Prices Over Time')
    plt.xticks(rotation=45)

    plt.tight_layout()
    plt.grid(True)
    plt.savefig('order/static/order/images/plot.png', format='png')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # Retrieve the list of clients and products in alphabetical order
        client_list = Order.objects.order_by('client').values_list('client', flat=True).distinct()
        product_list = ServicePack.objects.order_by('naming')

        # Calculate the total sales amount and iterate through each order to get total cost and profit
        total_sales = 0
        sales_list = []
        item_list = []
        order_list = self.get_queryset()
        for order in order_list:
            total_sales += order.get_total_cost()
            sales_list.append(order.get_total_cost())
            item_list.extend([item.servicepackinstance for item in order.items.all() if item.servicepackinstance])

        # Calculate statistical measures
        sales_mean = round(mean(sales_list), 2) if sales_list else 0
        sales_mode = mode(sales_list) if sales_list else 0
        sales_median = median(sales_list) if sales_list else 0

        # Calculate the most popular item
        item_count = Counter(item_list)
        popular_item = item_count.most_common(1)[0][0].service_pack.naming if item_count else None

        # Calculate the item with the most profit
        item_profit_dict = {}
        for order in order_list:
            for item in order.items.all():
                if item.servicepackinstance:
                    profit = (item.price - item.servicepackinstance.price) * item.quantity
                    if item.servicepackinstance not in item_profit_dict:
                        item_profit_dict[item.servicepackinstance] = profit
                    else:
                        item_profit_dict[item.servicepackinstance] += profit

        item_with_most_profit = max(item_profit_dict, key=lambda item: item_profit_dict[
            item]).service_pack.naming if item_profit_dict else None

        context['client_list'] = client_list
        context['product_list'] = product_list
        context['total_sales'] = total_sales
        context['sales_mean'] = sales_mean
        context['sales_mode'] = sales_mode
        context['sales_median'] = sales_median
        context['popular_item'] = popular_item
        context['item_with_most_profit'] = item_with_most_profit

        return context


class OrderDetailView(generic.DetailView):
    model = Order
