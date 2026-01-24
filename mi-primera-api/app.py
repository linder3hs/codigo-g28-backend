from flask import Flask
from config import config
from extensions import db, migrate, jwt
from routes import auth_bp, tareas_bp


def create_app(config_name='default'):
    app = Flask(__name__)
    # estamos cargando la configuracion
    app.config.from_object(config[config_name])
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(tareas_bp)
    return app

# iniciar un servidor donde se ejecute
# debug=True Modo desarrollo, por ende el servidor se reinicia solo
# se requiere hacer una configuración extra para que nuestras tablas se creen de forma automatica
if __name__ == "__main__":
    app = create_app('development')
    app.run(debug=True)
