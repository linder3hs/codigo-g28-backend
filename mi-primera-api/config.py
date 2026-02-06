import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """
    Clase base de configuracion
    """

    # Configuracion de Base de Datos
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SECRET_KEY = os.getenv('SECRET_KEY')

    # CORS
    CORS_ORIGINS = [
        'http://localhost:3000',
        'http://localhost:5173'
    ]

    # JWT
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    JWT_ACCESS_TOKEN_EXPIRES = 3600 # 1 HORA en segundos

    # Resend
    RESEND_API_KEY = os.getenv('RESEND_API_KEY')
    EMAIL_FROM = os.getenv('EMAIL_FROM')


class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

# Diccionario de configuraciones
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
