from django.db import models

# Create your models here.
class StudentSystem(models.Model):
    name=models.CharField(max_length=50)
    is_active=models.BooleanField(default=False)