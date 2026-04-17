from rest_framework import serializers
from .models import Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'from_location', 'to_location', 'text', 'created_at']
        read_only_fields = ['id', 'created_at']