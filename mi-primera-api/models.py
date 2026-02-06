"""
Modelo de la base de datos
table: tareas
"""
from datetime import datetime, timedelta
from extensions import db
import random
import string


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
    # verificar el usuario
    verificado = db.Column(db.Boolean, default=False)
    codigo_verificacion = db.Column(db.String(6))
    codigo_expiracion = db.Column(db.DateTime)

    fecha_creacion = db.Column(db.DateTime, default=datetime.utcnow)

    # relacion entre usuario y tareas
    tareas = db.relationship('Tarea', backref='usuario', lazy=True)

    def to_dict(self, incluir_tareas=False):
        data = {
            'id': self.id,
            'nombre': self.nombre,
            'email': self.email,
            'verificado': self.verificado,
            'fecha_creacion': self.fecha_creacion.isoformat()
        }

        if incluir_tareas:
            data['tareas'] = [tarea.to_dict() for tarea in self.tareas]
            data['total_tarea'] = len(self.tareas)
        return data

    def generar_codigo_verificacion(self):
        """
        Generar el codigo de 6 digitos
        """
        self.codigo_verificacion = ''.join(random.choices(string.digits, k=6))
        # vamos a definir un tiempo de expiracion 15 minutos
        self.codigo_expiracion = datetime.utcnow() + timedelta(minutes=15)
        return self.codigo_verificacion

    def verificar_codigo(self, codigo):
        """
        Verificar codigo
        """
        if not self.codigo_verificacion or not self.codigo_expiracion:
            return False

        if datetime.utcnow() > self.codigo_expiracion:
            return False

        return codigo == self.codigo_verificacion


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
    # cuando creemos o actualicemo una tarea sera necesario incluir el campo (columano) user_id
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)

    def to_dict(self, incluir_usuario=False):
        """
        Convertir el objeto a un diccionario JSON
        """
        data = {
            'id': self.id,
            'titulo': self.titulo,
            'descripcion': self.descripcion,
            'completado': self.completado,
            'usuario_id': self.usuario_id,
            'fecha_creacion': self.fecha_creacion.isoformat()
        }

        if incluir_usuario:
            data['usuario'] = {
                'id': self.usuario.id,
                'nombre': self.usuario.nombre,
                'email': self.usuario.email
            }
        return data
