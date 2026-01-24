from flask import Blueprint, jsonify, request
from extensions import db
from models import Tarea
from flask_jwt_extended import jwt_required, get_jwt_identity

# creamos el blue print
tareas_bp = Blueprint('tareas', __name__, url_prefix='/api/tareas')

# Lista todas las tareas
@tareas_bp.route('/')
@jwt_required()
def obtener_tareas():
    try:
        # obtener el id de usuario en session
        usuario_id = int(get_jwt_identity())
        tareas = Tarea.query.filter_by(usuario_id=usuario_id).all()
        return jsonify({
            'ok': True,
            'data': [tarea.to_dict(True) for tarea in tareas]
        })
    except Exception as e:
        return jsonify({'ok': False, 'message': str(e)}), 500



# Busca la tarea por id
@tareas_bp.route('/<int:id>')
@jwt_required()
def obtener_tarea(id):
    try:
        usuario_id = int(get_jwt_identity())
        tarea = Tarea.query.get(id)
        if tarea is None:
            return jsonify({'ok': False, 'message': 'Tarea no encontrada'}), 404

        # validamos si la tarea le pertenece al usuario autenticado
        if tarea.usuario_id != usuario_id:
            return jsonify({'ok': False, 'message': 'No tienes permisos'}), 403
        return jsonify({'ok': True, 'data': tarea.to_dict()})
    except Exception as e:
        return jsonify({'ok': False, 'message': str(e)}), 500


# Crear una nueva tarea
@tareas_bp.route('/', methods=['POST'])
@jwt_required()
def crear_tarea():
    try:
        payload = request.get_json()
        usuario_id = int(get_jwt_identity())

        # validacion titulo
        if not payload.get('titulo'):
            return jsonify({'ok': False, 'message': 'El titulo es requerido'}), 400

        # Guardar un registro en la base de datos
        nueva_tarea = Tarea(
            titulo=payload.get('titulo'),
            descripcion=payload.get('descripcion'),
            categoria=payload.get('categoria', ''),
            usuario_id=usuario_id
        )
        db.session.add(nueva_tarea)
        db.session.commit()

        return jsonify({'ok': True, 'data': nueva_tarea.to_dict()}), 201
    except Exception as e:
        return jsonify({'ok': False, 'message': str(e)}), 500


@tareas_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def actualizar_tarea(id):
    try:
        payload = request.get_json()
        usuario_id = int(get_jwt_identity())
        tarea = Tarea.query.get(id)

        if tarea is None:
            return jsonify({'ok': False, 'message': 'Tarea no encontrada'}), 404

        if tarea.usuario_id != usuario_id:
            return jsonify({'ok': False, 'message': 'No tienes permisos'}), 403

        if 'titulo' in payload:
            tarea.titulo = payload.get('titulo')

        if 'completado' in payload:
            tarea.completado = payload.get('completado')

        db.session.commit()
        return jsonify({'ok': True, 'data': tarea.to_dict()})
    except Exception as e:
        return jsonify({'ok': False, 'message': str(e)}), 500


@tareas_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def eliminar_tarea(id):
    try:
        tarea = Tarea.query.get(id)
        usuario_id = int(get_jwt_identity())
        if tarea is None:
            return jsonify({'ok': False, 'message': 'Tarea no encontrado'}), 404

        if tarea.usuario_id != usuario_id:
            return jsonify({'ok': False, 'message': 'No tienes permisos'}), 403

        db.session.delete(tarea)
        db.session.commit()
        return jsonify({'ok': True, 'message': 'Tarea eliminada de forma exitosa'})
    except Exception as e:
        return jsonify({'ok': False, 'message': str(e)}), 500
