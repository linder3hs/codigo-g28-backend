"""
Para crear clases que nos permitas tener datos de prueba
"""
import factory
from django.contrib.auth.models import User
from todos.models import Todo, Category


class UserFactory(factory.django.DjangoModelFactory):
    """
    Factory para poder crear usuario de prueba
    """
    class Meta:
        model = User
    
    username = factory.Sequence(lambda n: f"user_{n}")
    email = factory.LazyAttribute(lambda obj: f"{obj.username}@test.com")
    first_name = factory.Faker('first_name')
    password = factory.PosstGenerationMethodCall('set_password', 'Test1234!')
