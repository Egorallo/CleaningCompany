# Generated by Django 4.2.1 on 2023-09-25 10:05

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('newvision', '0003_promo'),
    ]

    operations = [
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reviewer_name', models.CharField(max_length=100)),
                ('rating', models.PositiveSmallIntegerField(validators=[django.core.validators.MinValueValidator(1, message='Rating must be at least 1'), django.core.validators.MaxValueValidator(5, message='Rating must be at most 5')])),
                ('text', models.TextField()),
                ('date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
