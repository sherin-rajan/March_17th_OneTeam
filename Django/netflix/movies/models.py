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
    
    def __str__(self):
        return self.category

class Movies(models.Model):
    movie=models.CharField(max_length=100,unique=True)
    category=models.ForeignKey(Category,on_delete=models.CASCADE)
    description=models.TextField()
    release_date=models.DateField()
    poster=models.ImageField(upload_to="posters")
    created_date=models.DateField(auto_now_add=True)
    trailer_link=models.URLField()

    def __str__(self):
        return self.movie