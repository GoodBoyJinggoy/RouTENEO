from django.db import models

# note: since database files are ignored by git, building data must be added manually
class Building(models.Model):
    building_name = models.CharField(max_length=255)
    coordinate_latitude = models.FloatField()
    coordinate_longitude = models.FloatField()
# Create your models here.
