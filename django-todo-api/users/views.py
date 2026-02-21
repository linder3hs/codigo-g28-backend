from rest_framework import generics, permissions
from drf_spectacular.utils import extend_schema
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, UserSerializer

# Registrar usuarios (POST)

@extend_schema(tags=['Register'])
class RegisterView(generics.CreateAPIView):
    # Solo tiene el endpoint create(POST)
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]



# Perfiles de usuarios (GET, PUT)
@extend_schema(tags=['Profile'])
class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
