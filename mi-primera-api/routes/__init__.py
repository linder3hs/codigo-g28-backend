from .auth_routes import auth_bp
from .tarea_routes import tareas_bp

# exportar ambos blueprint en solo una variable
__all__ = ['auth_bp', 'tareas_bp']
