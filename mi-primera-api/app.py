# importar Flask
from flask import Flask, jsonify, request
import os
from dotenv import load_dotenv

# import la db y la tabla tareas
from models import db, Tarea

# cargar las variables de entorno
load_dotenv()

# instanciar Flask
# __name__ == __main__
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

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
        tareas = Tarea.query.all()
        return jsonify({
            'ok': True,
            'data': [tarea.to_dict() for tarea in tareas]
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

        # Guardar un registro en la base de datos
        nueva_tarea = Tarea(titulo=payload.get('titulo'))
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
        for tarea in tareas:
            if tarea['id'] == id:
                tareas.remove(tarea)
                return jsonify({'ok': True, 'message': 'Tarea eliminada de forma exitosa'})
        return jsonify({'ok': False, 'message': 'Tarea no encontrado'}), 404
    except Exception as e:
        return jsonify({'ok': False, 'message': str(e)}), 500



# iniciar un servidor donde se ejecute
# debug=True Modo desarrollo, por ende el servidor se reinicia solo
# se requiere hacer una configuración extra para que nuestras tablas se creen de forma automatica
if __name__ == "__main__":
    # crear las tablas
    with app.app_context():
        db.create_all()
        print("Base de datos conectada!")
        print("Tablas creadas!")
    app.run(debug=True)
