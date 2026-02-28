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
    password = factory.PostGenerationMethodCall('set_password', 'Test1234!')


class CategoryFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Category

    name = factory.Sequence(lambda n: f"Category {n}")
    description = factory.Faker('sentence')
    created_by = factory.SubFactory(UserFactory)


class TodoFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Todo

    title = factory.Faker('sentence', nb_words=4)
    description = factory.Faker('paragraph')
    completed = False
    user = factory.SubFactory(UserFactory)
    category = factory.SubFactory(CategoryFactory)
