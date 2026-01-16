# importar Flask
from flask import Flask, jsonify

# instanciar Flask
# __name__ == __main__
app = Flask(__name__)

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
    return jsonify({'ok': True, 'data': tareas})


# Busca la tarea por id
@app.route('/api/tareas/<int:id>')
def obtener_tarea(id):
    for tarea in tareas:
        if tarea['id'] == id:
            return jsonify({'ok': True, 'data': tarea})
    return jsonify({'ok': False, 'message': 'Tarea no encontrada'}), 404

# iniciar un servidor donde se ejecute
# debug=True Modo desarrollo, por ende el servidor se reinicia solo
app.run(debug=True)
