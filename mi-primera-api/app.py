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
