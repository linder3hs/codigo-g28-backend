from rest_framework import viewsets, permissions
from .models import Todo
from .serializers import TodoSerializer


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
