from django.db import models

# Create your models here.
class Task(models.Model):
    task=models.CharField(max_length=100)
    description=models.CharField(max_length=200)
    is_completed=models.BooleanField(default=False)
    created_at=models.DateField(auto_now_add=True)

