# importar Flask
from flask import Flask

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


# iniciar un servidor donde se ejecute
# debug=True Modo desarrollo, por ende el servidor se reinicia solo
app.run(debug=True)
