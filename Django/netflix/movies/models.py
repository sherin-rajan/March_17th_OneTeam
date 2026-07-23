from django.db import models
from django.utils.text import slugify

# Create your models here.
class Category(models.Model):
    category=models.CharField(max_length=50,unique=True)
    slug=models.SlugField()

    def save(self):
        name=self.category
        self.slug=slugify(name)
        return super().save()

