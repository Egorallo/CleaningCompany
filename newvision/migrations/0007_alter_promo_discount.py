# Generated by Django 4.2.1 on 2023-11-13 14:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('newvision', '0006_promo_discount'),
    ]

    operations = [
        migrations.AlterField(
            model_name='promo',
            name='discount',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=3),
        ),
    ]
