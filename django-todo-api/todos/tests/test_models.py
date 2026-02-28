import pytest
from tests.factories import UserFactory, CategoryFactory, TodoFactory


@pytest.mark.django_db
class TestCategoryModel:
    """
    @pytest.mark.django_db permite acceder a la base de datos durante las pruebas
    """
    def test_category_creation(self):
        category = CategoryFactory(name="Trabajo", description="Tareas del trabajo")

        assert category.id is not None
        assert category.name == "Trabajo"
        assert category.description == "Tareas del trabajo"
        assert category.created_at is not None

    def test_category_name_is_unique(self):
        """Test para validar que no se puedan crear 2 categorias iguales"""
        from django.db import IntegrityError

        CategoryFactory(name="Unico")
        with pytest.raises(IntegrityError):
            CategoryFactory(name="Unico")
