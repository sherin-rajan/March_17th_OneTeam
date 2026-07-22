from django.db import models

# Create your models here.
class Details(models.Model):
    name=models.CharField(max_length=100)
    email=models.CharField(max_length=30)
    is_active=models.BooleanField(default=False)
    date=models.DateField(auto_now_add=True)
