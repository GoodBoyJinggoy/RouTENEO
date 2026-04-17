from django.db import models

class Comment(models.Model):
    from_location = models.CharField(max_length=200)
    to_location = models.CharField(max_length=200)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)