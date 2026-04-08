from django.db import models
from accounts.models import Profile

class Building(models.Model):
    building_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()

class Route(models.Model):
    route_id = models.AutoField(primary_key=True)
    route_name = models.CharField(max_length=255)
    start_building = models.ForeignKey(Building, on_delete=models.CASCADE, related_name="route_start")
    end_building = models.ForeignKey(Building, on_delete=models.CASCADE, related_name="route_end")

class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    date = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="user_comment")
    route = models.ForeignKey(Route, on_delete=models.CASCADE, related_name="route_comment")