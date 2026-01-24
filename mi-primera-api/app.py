# importar Flask
from flask import Flask, jsonify, request, session

# import la db y la tabla tareas
from models import db, Tarea
# importar flask-migrate
from flask_migrate import Migrate

# instanciar Flask
# __name__ == __main__
app = Flask(__name__)

db.init_app(app)

# instaciar Migrate
migrate = Migrate(app, db)

# Ya podemos crear endpoints (rutas)
@app.route("/") # raiz
def hello():
    return {'message': 'Hola mundo desde Flask!!!'}

# Base de datos local (simulación)
tareas = [
    { 'id': 1, 'titulo': 'Comprar adaptador de mouse', 'completado': False},
    { 'id': 2, 'titulo': 'Limpiar auto', 'completado': True}
]

# Lista todas las tareas
@app.route('/api/tareas')
def obtener_tareas():
    try:
        # obtener el id de usuario en session
        usuario_id = session['usuario_id']
        tareas = Tarea.query.filter_by(usuario_id=usuario_id).all()
        return jsonify({
            'ok': True,
            'data': [tarea.to_dict(True) for tarea in tareas]
        })
    except Exception as e:
        return jsonify({'ok': False, 'message': str(e)}), 500



# Busca la tarea por id
@app.route('/api/tareas/<int:id>')
def obtener_tarea(id):
    try:
        tarea = Tarea.query.get(id)
        if tarea is None:
            return jsonify({'ok': False, 'message': 'Tarea no encontrada'}), 404
        return jsonify({'ok': True, 'data': tarea.to_dict()})
    except Exception as e:
        return jsonify({'ok': False, 'message': str(e)}), 500


# Crear una nueva tarea
@app.route('/api/tareas', methods=['POST'])
def crear_tarea():
    try:
        payload = request.get_json()

        # validacion titulo
        if not payload.get('titulo'):
            return jsonify({'ok': False, 'message': 'El titulo es requerido'}), 400

        if not payload.get('usuario_id'):
            return jsonify({'ok': False, 'message': 'La tarea debe estar asociada a un usuario'}), 400

        # Guardar un registro en la base de datos
        nueva_tarea = Tarea(
            titulo=payload.get('titulo'),
            descripcion=payload.get('descripcion'),
            categoria=payload.get('categoria', ''),
            usuario_id=payload.get('usuario_id')
        )
        db.session.add(nueva_tarea)
        db.session.commit()

        return jsonify({'ok': True, 'data': nueva_tarea.to_dict()}), 201
    except Exception as e:
        return jsonify({'ok': False, 'message': str(e)}), 500


@app.route('/api/tareas/<int:id>', methods=['PUT'])
def actualizar_tarea(id):
    try:
        payload = request.get_json()
        tarea = Tarea.query.get(id)

        if tarea is None:
            return jsonify({'ok': False, 'message': 'Tarea no encontrada'}), 404

        if 'titulo' in payload:
            tarea.titulo = payload.get('titulo')

        if 'completado' in payload:
            tarea.completado = payload.get('completado')

        db.session.commit()
        return jsonify({'ok': True, 'data': tarea.to_dict()})
    except Exception as e:
        return jsonify({'ok': False, 'message': str(e)}), 500


@app.route('/api/tareas/<int:id>', methods=['DELETE'])
def eliminar_tarea(id):
    try:
        tarea = Tarea.query.get(id)
        if tarea is None:
            return jsonify({'ok': False, 'message': 'Tarea no encontrado'}), 404

        db.session.delete(tarea)
        db.session.commit()
        return jsonify({'ok': True, 'message': 'Tarea eliminada de forma exitosa'})
    except Exception as e:
        return jsonify({'ok': False, 'message': str(e)}), 500


# iniciar un servidor donde se ejecute
# debug=True Modo desarrollo, por ende el servidor se reinicia solo
# se requiere hacer una configuración extra para que nuestras tablas se creen de forma automatica
if __name__ == "__main__":
    # crear las tablas
    # with app.app_context():
    #     db.create_all()
    #     print("Base de datos conectada!")
    #     print("Tablas creadas!")
    # Hemos comentado esta seccion porque ahora Migrate se encarga de la DB
    app.run(debug=True)
