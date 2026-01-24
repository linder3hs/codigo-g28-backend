from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from extensions import db
from models import Usuario

# crear el BluePrint (bp)
auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

# nuevos endpoint para usuarios
@auth_bp.route("/registro", methods=['POST'])
def registro():
    """
    nombre, email, password
    """
    try:
        payload = request.get_json()
        # validaciones
        if not payload.get('nombre'):
            return jsonify({'ok': False, 'message': 'El nombre es requerido'}), 400

        if not payload.get('email'):
            return jsonify({'ok': False, 'message': 'El email es requerido'}), 400

        if not payload.get('password'):
            return jsonify({'ok': False, 'message': 'El password es requerido'}), 400

        usuario_existente = Usuario.query.filter_by(email=payload.get('email')).first()

        if usuario_existente:
            return jsonify({'ok': False, 'message': 'El email ya fue registrado'}), 400

        # si llego hasta acá es un nuevo usuario y cumple con las validaciones
        password_hash = generate_password_hash(payload.get('password'))

        nuevo_usuario = Usuario(
            nombre=payload.get('nombre'),
            email=payload.get('email'),
            password=password_hash
        )
        db.session.add(nuevo_usuario)
        db.session.commit()

        # crear el token
        access_token = create_access_token(identity=str(nuevo_usuario.id))

        return jsonify({
            'ok': True,
            'message': 'Usuario creado correctamente',
            'data': nuevo_usuario.to_dict(),
            'access_token': access_token
        }), 201
    except Exception as e:
        return jsonify({'ok': False, 'message': str(e)}), 500


@auth_bp.route('/login', methods=['POST'])
def login():
    """
    email, password
    """
    try:
        payload = request.get_json()

        if not payload.get('email'):
            return jsonify({'ok': False, 'message': 'El email es requerido'}), 400

        if not payload.get('password'):
            return jsonify({'ok': False, 'message': 'El password es requerido'}), 400

        # buscar al usuario en la base de datos
        usuario = Usuario.query.filter_by(email=payload.get('email')).first()

        if not usuario or not check_password_hash(usuario.password, payload.get('password')):
            return jsonify({'ok': False, 'message': 'Email y/o incorrectos'}), 400

        # crear el token
        access_token = create_access_token(identity=str(usuario.id))
        return jsonify({
            'ok': True,
            'message': 'Bienvenido!',
            'data': usuario.to_dict(),
            'access_token': access_token
        })
    except Exception as e:
        return jsonify({'ok': False, 'message': str(e)}), 500
