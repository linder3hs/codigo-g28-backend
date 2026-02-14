from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoViewSet

router = DefaultRouter()
router.register(r'todos', TodoViewSet, basename='todo')

# Django tiene la regla que todas las URLs deben crearse en la
# variable urlpatterns
urlpatterns = [
  path('', include(router.urls))
]
