from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

class News(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)
    image_url = models.URLField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.title

class Promo(models.Model):
    code = models.CharField(max_length=20, unique=True)
    description = models.TextField()
    is_archived = models.BooleanField(default=False)
    discount = models.DecimalField(max_digits=5, decimal_places=1, default=0)

    def __str__(self):
        return self.code

class Review(models.Model):
    reviewer_name = models.CharField(max_length=100)
    rating = models.PositiveSmallIntegerField(
        validators=[
            MinValueValidator(1, message="Rating must be at least 1"),
            MaxValueValidator(5, message="Rating must be at most 5"),
        ]
    )
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

class Banner(models.Model):
    image_url = models.URLField()
    link_url = models.URLField()
