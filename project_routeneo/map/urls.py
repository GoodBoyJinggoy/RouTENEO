from rest_framework.routers import DefaultRouter
from .views import BuildingViewSet

# https://av.tib.eu/media/45441
# https://www.geeksforgeeks.org/python/viewsets-routers-django-rest-framework/

router = DefaultRouter()
router.register(r'buildings', BuildingViewSet, basename='building')

urlpatterns = router.urls
