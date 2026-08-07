from django.db import models
from django.utils.text import slugify
from actors.models import Actors

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
    category=models.ForeignKey(Category,on_delete=models.CASCADE,related_name='movies')
    description=models.TextField()
    release_date=models.DateField()
    poster=models.ImageField(upload_to="posters")
    created_date=models.DateField(auto_now_add=True)
    trailer_link=models.URLField()

    def __str__(self):
        return self.movie

class Cast(models.Model):
    class Role(models.TextChoices):
        ACTOR="ACTOR","Actor"
        DIRECTOR="DIRECTOR",'Director'
        PRODUCER='PRODUCER','Producer'
    movie=models.ForeignKey(Movies,on_delete=models.CASCADE,related_name='casts')
    role=models.CharField(max_length=20,choices=Role.choices)
    actor=models.ForeignKey(Actors,on_delete=models.CASCADE)
    character_name=models.CharField(max_length=40,blank=True)

    def __str__(self):
        return f'{self.movie} - {self.role} - {self.actor}'

class Review(models.Model):
    movie=models.ForeignKey(Movies,on_delete=models.CASCADE,related_name='reviews')
    username=models.CharField(max_length=50)
    rating=models.PositiveSmallIntegerField()
    comment=models.TextField()
    date=models.DateField(auto_now_add=True)

    def __str__(self):
        return f'{self.username} - {self.movie.movie}'
    