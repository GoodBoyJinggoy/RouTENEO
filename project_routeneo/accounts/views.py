from .models import Profile
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny

class CreateUserView(generics.CreateAPIView):
    queryset = Profile
    serializer_class = UserSerializer
    permission_classes = [AllowAny]