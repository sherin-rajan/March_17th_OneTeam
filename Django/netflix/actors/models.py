from django.db import models

# Create your models here.
class Actors(models.Model):
    name=models.CharField(max_length=50)
    place=models.CharField(max_length=40)
    dob=models.DateField()
    picture=models.ImageField(upload_to='actors')
    about=models.TextField()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name='Actors'
        verbose_name_plural='Actors'
