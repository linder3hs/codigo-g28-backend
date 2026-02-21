from rest_framework import viewsets, permissions
from drf_spectacular.utils import extend_schema
from .models import Todo, Category
from .serializers import TodoSerializer, CategorySerializer
from .filters import TodoFilter

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
    # Filtros
    filterset_class = TodoFilter
    search_fields = ['title', 'description'] # ?search=text
    ordering_fields = ['created_at', 'title'] # ?ordering=title
    ordering = ['-created_at'] # order por defecto

    # Filtrar las tareas por usuario
    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user)

    # Cuando se cree un tarea, le asignamos el usuario authenticated
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
