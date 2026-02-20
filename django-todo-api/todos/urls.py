from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoViewSet, CategoryViewSet

router = DefaultRouter()
router.register(r'', TodoViewSet, basename='todo')
router.register(r'categories', CategoryViewSet, basename='category')

# Django tiene la regla que todas las URLs deben crearse en la
# variable urlpatterns
urlpatterns = [
  path('', include(router.urls))
]
