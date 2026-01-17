"""
Modelo de la base de datos
table: tareas
"""
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# Crear la instancia a la base de datos
# db = data base
db = SQLAlchemy()

class Tarea(db.Model):
    """
    Modelo de Tarea
    representa a la tabla tareas
    """
    __tablename__ = 'tareas'

    # atributos de la tabla (columnas)
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(200), nullable=False)
    completado = db.Column(db.Boolean, default=False)
    fecha_creacion = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        """
        Convertir el objeto a un diccionario JSON
        """
        return {
            'id': self.id,
            'titulo': self.titulo,
            'completado': self.completado,
            'fecha_creacion': self.fecha_creacion.isoformat()
        }
