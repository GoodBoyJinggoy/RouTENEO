from django.db import models
from django.contrib.auth.models import User
from map.models import Route

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    
    email = models.EmailField(primary_key=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    
    @property
    def __str__(self):
        return self.first_name + " " + self.last_name
    
class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    date = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="user_comment")
    route = models.ForeignKey(Route, on_delete=models.CASCADE, related_name="route_comment")