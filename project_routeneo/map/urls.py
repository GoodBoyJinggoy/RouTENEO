from rest_framework.routers import DefaultRouter
from .views import BuildingViewSet, CommentView, CommentAddView, RouteView
from django.urls import path, include

# https://av.tib.eu/media/45441
# https://www.geeksforgeeks.org/python/viewsets-routers-django-rest-framework/

router = DefaultRouter()
router.register(r'buildings', BuildingViewSet, basename='building')
router.register(r'routes', RouteView, basename='route')

urlpatterns = [
    path('', include(router.urls)),

    path('routes/<int:route_id>/comments/', CommentView.as_view(), name='comment'),
    path('routes/<int:route_id>/comments/add/', CommentAddView.as_view(), name='comment_add'),
]