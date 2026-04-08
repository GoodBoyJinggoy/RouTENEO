from rest_framework import serializers
from .models import Building, Route, Comment

class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = ["building_id", x"name", "latitude", "longitude"]

class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = ["route_id", "route_name", "start_building", "end_building"]

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["comment_id", "date", "content", "user", "route"]