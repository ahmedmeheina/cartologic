from django.db import models

# Create your models here.

class Shop(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    lon = models.FloatField()
    lat = models.FloatField()
