from django.db import models

# Create your models here.
class ToDos(models.Model):
    task=models.CharField(max_length=100)
    is_completed=models.BooleanField(default=False)
    date=models.DateField(auto_now_add=True)
