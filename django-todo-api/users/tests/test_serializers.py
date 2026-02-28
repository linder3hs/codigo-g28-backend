import pytest
from tests.factories import UserFactory
from users.serializers import RegisterSerializer


@pytest.mark.django_db
class TestRegisterSerializer:
    """
    Validar las reglas del negocio, en este caso
    el registro de usuarios
    """
    def test_valid_registration_data(self):
        data = {
            "username": "nuevo_user",
            "email": "nuevo_user@test.com",
            "first_name": "Nuevo",
            "password": "SecurePwd123!",
            "password_confirmation": "SecurePwd123!"
        }
        serializer = RegisterSerializer(data=data)
        assert serializer.is_valid(), serializer.errors

    def test_password_dont_match(self):
        data = {
            "username": "nuevo_user",
            "email": "nuevo_user@test.com",
            "first_name": "Nuevo",
            "password": "SecurePwd123!",
            "password_confirmation": "OtherPwd123!"
        }
        serializer = RegisterSerializer(data=data)
        assert not serializer.is_valid()
        assert "password" in serializer.errors
    
    def test_password_rejected(self):
        data = {
            "username": "nuevo_user",
            "email": "nuevo_user@test.com",
            "first_name": "Nuevo",
            "password": "123",
            "password_confirmation": "123"
        }
        serializer = RegisterSerializer(data=data)
        assert not serializer.is_valid()
        assert "password" in serializer.errors
