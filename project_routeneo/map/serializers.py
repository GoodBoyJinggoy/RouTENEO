from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import Building

#https://pypi.org/project/djangorestframework-gis/

class BuildingSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Building
        fields = ["name", "latitude", "longitude"]
