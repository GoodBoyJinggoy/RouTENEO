from django.db import models

class Building(models.Model):
    name = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()

class Route(models.Model):
    route_id = models.IntegerField()
    route_name = models.CharField(max_length=255)
    start_building = models.ForeignKey(Building, on_delete=models.CASCADE, related_name="route_start")
    end_building = models.ForeignKey(Building, on_delete=models.CASCADE, related_name="route_end")