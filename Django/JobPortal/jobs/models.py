from django.db import models

# Create your models here.
class Sectors(models.Model):
    name=models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Company(models.Model):
    name=models.CharField(max_length=50,unique=True)
    address=models.CharField(max_length=300)
    website=models.URLField()

    def __str__(self):
        return self.name


class Jobs(models.Model):
    title=models.CharField(max_length=100)
    sector=models.ForeignKey(Sectors,on_delete=models.CASCADE)
    location=models.CharField(max_length=50)
    description=models.TextField()
    salary=models.CharField(max_length=50)

    def __str__(self):
        return self.title




