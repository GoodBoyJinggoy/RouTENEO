from django.urls import path
from .views import CommentsView

urlpatterns = [
    path('comments/', CommentsView.as_view()),
    path('comments/<int:id>/', CommentsView.as_view()),
]