"""
Modelo de la base de datos
table: tareas
"""
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# Crear la instancia a la base de datos
# db = data base
db = SQLAlchemy()

class Usuario(db.Model):
    """
    Model de Usuario
    representa a la tabla usuarios
    """
    __tablename__ = "usuarios"

    # columnas
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(200), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    fecha_creacion = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'email': self.email,
            'fecha_creacion': self.fecha_creacion.isoformat()
        }

class Tarea(db.Model):
    """
    Modelo de Tarea
    representa a la tabla tareas
    """
    __tablename__ = 'tareas'

    # atributos de la tabla (columnas)
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(200), nullable=False)
    descripcion = db.Column(db.Text)
    categoria = db.Column(db.String(100))
    completado = db.Column(db.Boolean, default=False)
    fecha_creacion = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        """
        Convertir el objeto a un diccionario JSON
        """
        return {
            'id': self.id,
            'titulo': self.titulo,
            'descripcion': self.descripcion,
            'completado': self.completado,
            'fecha_creacion': self.fecha_creacion.isoformat()
        }
