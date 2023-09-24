from django.db import models

class News(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)
    image_url = models.URLField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.title