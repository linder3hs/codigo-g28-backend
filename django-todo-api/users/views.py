from rest_framework import generics, permissions, status
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, UserSerializer

# Registrar usuarios (POST)
class RegisterView(generics.CreateAPIView):
    # Solo tiene el endpoint create(POST)
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]



# Perfiles de usuarios (GET, PUT)
class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
