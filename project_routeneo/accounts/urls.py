from django.urls import path, include
from .views import CreateUserView, ProfileView, ChangePasswordView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("user/register/", CreateUserView.as_view(), name = "register"),
    path("token/", TokenObtainPairView.as_view(), name = "token"),
    path("token/refresh/", TokenRefreshView.as_view(), name = "refresh"),
    path("accounts-auth/", include("rest_framework.urls")),
    path("profile/", ProfileView.as_view(), name = "profile"),
    path("change-password/", ChangePasswordView.as_view(), name="change-password"),
]
