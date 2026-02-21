from rest_framework import viewsets, permissions
from drf_spectacular.utils import extend_schema
from .models import Todo, Category
from .serializers import TodoSerializer, CategorySerializer


@extend_schema(tags=['Categories'])
class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(created_by=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


@extend_schema(tags=['Todos'])
class TodoViewSet(viewsets.ModelViewSet):
    """
    Va a generar de forma automatica GET, POST, PUT/PATCH, DELETE
    """
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Filtrar las tareas por usuario
    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user)

    # Cuando se cree un tarea, le asignamos el usuario authenticated
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
