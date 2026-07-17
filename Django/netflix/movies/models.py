from django.db import models

# Create your models here.
class Movies(models.Model):
    movie=models.CharField(max_length=100)
    date=models.DateField(auto_now_add=True)