import pytest
from tests.factories import UserFactory, CategoryFactory, TodoFactory
from todos.models import Category

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

    def test_category_belongs_to_user(self):
        """Cada categiria debe estar asociada a un usuario"""
        user = UserFactory(username="linder")
        category = CategoryFactory(created_by=user)

        assert category.created_by.username == "linder"

    def test_category_ordering(self):
        """Porbar que el order del modelo funcione correctamente"""
        user = UserFactory()
        CategoryFactory(name="Pagos", created_by=user)
        CategoryFactory(name="Compras", created_by=user)
        CategoryFactory(name="Hogar", created_by=user)

        # en teoria cuando obtenemos la lista, esta debe venir ordenada
        categories = list(Category.objects.filter(created_by=user))
        # extraemos los nombres de las categorias
        names = [c.name for c in categories]
        # nombres actuales tienen el mismo orden que al usar sorted que retorne true
        assert names == sorted(names)


@pytest.mark.django_db
class TestTodoModel:

    def test_todo_creation(self):
        todo = TodoFactory(title="Aprendiendo Django")

        assert todo.id is not None
        assert todo.title == "Aprendiendo Django"
        assert todo.completed is False
        assert todo.created_at is not None

    def test_todo_belongs_user(self):
        user = UserFactory(username="anderson")
        todo = TodoFactory(user=user)

        assert todo.user.username == "anderson"

    def test_todo_with_category(self):
        category = CategoryFactory(name="Hogar")
        todo = TodoFactory(category=category)

        assert todo.category.name == "Hogar"

    def test_todo_without_category(self):
        todo = TodoFactory(category=None)
        assert todo.category is None

    def test_todo_can_be_completed(self):
        todo = TodoFactory(completed=False)
        todo.completed = True
        todo.save()

        todo.refresh_from_db()

        assert todo.completed is True
    
    def test_todo_delete_when_use_deleted(self):
        from todos.models import Todo

        user = UserFactory()
        TodoFactory(user=user)
        TodoFactory(user=user)
        TodoFactory(user=user)

        user_id = user.id
        user.delete()

        assert Todo.objects.filter(user_id=user_id).count() == 0

    def test_todo_category_set_null_when_category_deleted(self):
        category = CategoryFactory()
        todo = TodoFactory(category=category)

        category.delete()
        todo.refresh_from_db()

        assert todo.category is None
