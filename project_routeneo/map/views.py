from rest_framework.viewsets import ReadOnlyModelViewSet
from .models import Building
from .serializers import BuildingSerializer

# https://av.tib.eu/media/45441
# https://www.geeksforgeeks.org/python/viewsets-routers-django-rest-framework/

class BuildingViewSet(ReadOnlyModelViewSet):
    queryset = Building.objects.all()
    serializer_class = BuildingSerializer