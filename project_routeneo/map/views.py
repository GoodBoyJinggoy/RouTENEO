from rest_framework.viewsets import ReadOnlyModelViewSet
from .models import Building, Comment
from .serializers import BuildingSerializer, CommentSerializer
from rest_framework import generics, permissions

# https://av.tib.eu/media/45441
# https://www.geeksforgeeks.org/python/viewsets-routers-django-rest-framework/

class BuildingViewSet(ReadOnlyModelViewSet):
    queryset = Building.objects.all()
    serializer_class = BuildingSerializer

class CommentView(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class CommentAddView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]