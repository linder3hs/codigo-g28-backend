# Mi Primera API con Flask

Este proyecto es una API RESTful construida con Flask y Python, diseñada para estudiantes que están aprendiendo a desarrollar aplicaciones web con Flask. La API permite gestionar tareas (tareas) con autenticación de usuarios, utilizando una base de datos PostgreSQL y migraciones con Flask-Migrate.

## Descripción del Proyecto

La aplicación es una API simple para la gestión de tareas personales. Los usuarios pueden registrarse, iniciar sesión y gestionar sus propias tareas. Cada tarea tiene un título, descripción opcional, categoría, estado de completado y está asociada a un usuario.

Este proyecto cubre conceptos fundamentales de Flask como:

- Creación de rutas (endpoints)
- Manejo de solicitudes HTTP (GET, POST, PUT, DELETE)
- Autenticación con JWT (JSON Web Tokens)
- Integración con bases de datos usando SQLAlchemy
- Migraciones de base de datos con Flask-Migrate
- Validación de datos
- Manejo de errores

## Características

- **Autenticación de usuarios**: Registro y login con hash de contraseñas
- **Gestión de tareas**: Crear, leer, actualizar y eliminar tareas
- **Relaciones en base de datos**: Usuarios tienen múltiples tareas
- **API RESTful**: Endpoints JSON para todas las operaciones
- **Migraciones de base de datos**: Control de versiones de la base de datos
- **Variables de entorno**: Configuración segura con .env

## Tecnologías Utilizadas

- **Flask**: Framework web para Python
- **Flask-SQLAlchemy**: ORM para interactuar con la base de datos
- **Flask-Migrate**: Herramienta para migraciones de base de datos
- **Flask-JWT-Extended**: Extensión para autenticación con JWT
- **PostgreSQL**: Base de datos relacional
- **psycopg2-binary**: Adaptador PostgreSQL para Python
- **python-dotenv**: Carga de variables de entorno
- **Werkzeug**: Utilidades de seguridad (hash de contraseñas)

## Instalación

### Prerrequisitos

- Python 3.8 o superior
- PostgreSQL (o una base de datos compatible como Neon)
- pip (gestor de paquetes de Python)

### Pasos de Instalación

1. **Clona el repositorio** (o descarga los archivos del proyecto):

   ```bash
   git clone <url-del-repositorio>
   cd mi-primera-api
   ```

2. **Crea un entorno virtual** (recomendado):

   ```bash
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   ```

3. **Instala las dependencias**:

   ```bash
   pip install -r requirements.txt
   ```

4. **Configura las variables de entorno**:
   - Copia el archivo `.env` y modifica los valores según tu configuración:
     ```
     DATABASE_URL='postgresql://usuario:password@localhost:5432/nombre_db'
     SECRET_KEY='tu-clave-secreta-super-segura'
     ```
   - Para desarrollo local, puedes usar SQLite cambiando la DATABASE_URL:
     ```
     DATABASE_URL='sqlite:///app.db'
     ```

5. **Ejecuta las migraciones de la base de datos**:
   ```bash
   flask db upgrade
   ```

## Ejecución de la Aplicación

Para ejecutar la aplicación en modo desarrollo:

```bash
python app.py
```

La aplicación se ejecutará en `http://localhost:5000` con modo debug activado, lo que significa que se reiniciará automáticamente cuando hagas cambios en el código.

## Estructura del Proyecto

```
mi-primera-api/
├── app.py              # Archivo principal de la aplicación Flask
├── config.py           # Configuraciones de la aplicación
├── extensions.py       # Extensiones de Flask (db, jwt)
├── models.py           # Modelos de la base de datos (Usuario y Tarea)
├── requirements.txt    # Dependencias del proyecto
├── .env                # Variables de entorno (no subir a git)
├── .gitignore          # Archivos ignorados por git
├── README.md           # Este archivo
├── routes/             # Rutas organizadas por módulos
│   ├── __init__.py
│   ├── auth_routes.py  # Endpoints de autenticación
│   └── tarea_routes.py # Endpoints de tareas
└── migrations/         # Migraciones de la base de datos
    ├── alembic.ini
    ├── env.py
    ├── README
    ├── script.py.mako
    └── versions/        # Archivos de migración individuales
```

## API Endpoints

### Autenticación

#### Registro de Usuario

- **URL**: `/api/auth/registro`
- **Método**: `POST`
- **Cuerpo**:
  ```json
  {
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "password": "password123"
  }
  ```
- **Respuesta exitosa**:
  ```json
  {
    "ok": true,
    "message": "Usuario creado correctamente",
    "data": {
      "id": 1,
      "nombre": "Juan Pérez",
      "email": "juan@example.com",
      "fecha_creacion": "2023-01-01T00:00:00"
    },
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
  }
  ```

#### Inicio de Sesión

- **URL**: `/api/auth/login`
- **Método**: `POST`
- **Cuerpo**:
  ```json
  {
    "email": "juan@example.com",
    "password": "password123"
  }
  ```
- **Respuesta exitosa**:
  ```json
  {
    "ok": true,
    "message": "Bienvenido!",
    "data": {
      "id": 1,
      "nombre": "Juan Pérez",
      "email": "juan@example.com",
      "fecha_creacion": "2023-01-01T00:00:00"
    },
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
  }
  ```

### Tareas

#### Obtener Todas las Tareas del Usuario

- **URL**: `/api/tareas`
- **Método**: `GET`
- **Requiere autenticación**: Sí (JWT en header Authorization: Bearer <token>)
- **Respuesta**:
  ```json
  {
    "ok": true,
    "data": [
      {
        "id": 1,
        "titulo": "Comprar adaptador de mouse",
        "descripcion": null,
        "completado": false,
        "usuario_id": 1,
        "fecha_creacion": "2023-01-01T00:00:00"
      }
    ]
  }
  ```

#### Obtener una Tarea Específica

- **URL**: `/api/tareas/<id>`
- **Método**: `GET`
- **Parámetros**: `id` (ID de la tarea)
- **Requiere autenticación**: Sí (JWT en header Authorization: Bearer <token>)
- **Respuesta**:
  ```json
  {
    "ok": true,
    "data": {
      "id": 1,
      "titulo": "Comprar adaptador de mouse",
      "descripcion": null,
      "completado": false,
      "usuario_id": 1,
      "fecha_creacion": "2023-01-01T00:00:00"
    }
  }
  ```

#### Crear una Nueva Tarea

- **URL**: `/api/tareas`
- **Método**: `POST`
- **Requiere autenticación**: Sí (JWT en header Authorization: Bearer <token>)
- **Cuerpo**:
  ```json
  {
    "titulo": "Nueva tarea",
    "descripcion": "Descripción opcional",
    "categoria": "Trabajo"
  }
  ```
- **Respuesta**:
  ```json
  {
    "ok": true,
    "data": {
      "id": 2,
      "titulo": "Nueva tarea",
      "descripcion": "Descripción opcional",
      "completado": false,
      "usuario_id": 1,
      "fecha_creacion": "2023-01-01T00:00:00"
    }
  }
  ```

#### Actualizar una Tarea

- **URL**: `/api/tareas/<id>`
- **Método**: `PUT`
- **Parámetros**: `id` (ID de la tarea)
- **Requiere autenticación**: Sí (JWT en header Authorization: Bearer <token>)
- **Cuerpo** (campos opcionales):
  ```json
  {
    "titulo": "Título actualizado",
    "completado": true
  }
  ```

#### Eliminar una Tarea

- **URL**: `/api/tareas/<id>`
- **Método**: `DELETE`
- **Parámetros**: `id` (ID de la tarea)
- **Requiere autenticación**: Sí (JWT en header Authorization: Bearer <token>)
- **Respuesta**:
  ```json
  {
    "ok": true,
    "message": "Tarea eliminada de forma exitosa"
  }
  ```

## Modelos de Base de Datos

### Usuario

- `id`: Integer (Primary Key)
- `nombre`: String (100 caracteres, no nulo)
- `email`: String (200 caracteres, único, no nulo)
- `password`: String (255 caracteres, no nulo, hasheado)
- `fecha_creacion`: DateTime (por defecto: ahora)

### Tarea

- `id`: Integer (Primary Key)
- `titulo`: String (200 caracteres, no nulo)
- `descripcion`: Text (opcional)
- `categoria`: String (100 caracteres, opcional)
- `completado`: Boolean (por defecto: False)
- `fecha_creacion`: DateTime (por defecto: ahora)
- `usuario_id`: Integer (Foreign Key a usuarios.id, no nulo)

## Migraciones de Base de Datos

El proyecto utiliza Flask-Migrate para manejar cambios en la estructura de la base de datos. Los archivos de migración están en la carpeta `migrations/versions/`.

Para crear una nueva migración después de cambiar los modelos:

```bash
flask db migrate -m "Descripción del cambio"
flask db upgrade
```

## Pruebas con Postman o cURL

Puedes probar la API usando Postman o comandos cURL:

### Registro

```bash
curl -X POST http://localhost:5000/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan","email":"juan@example.com","password":"123"}'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"juan@example.com","password":"123"}'
```

### Crear Tarea

```bash
curl -X POST http://localhost:5000/api/tareas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{"titulo":"Mi tarea"}'
```

## Aprendizajes Clave

Este proyecto te ayudará a entender:

- Cómo estructurar una aplicación Flask
- El patrón MVC básico
- Autenticación con JWT
- Diseño de APIs REST
- Trabajo con bases de datos relacionales
- Manejo de migraciones
- Seguridad básica (hash de contraseñas)
- Validación de entrada
- Manejo de errores

## Próximos Pasos

Para expandir este proyecto, podrías:

- Agregar más validaciones
- Agregar paginación a las listas
- Crear un frontend con HTML/CSS/JavaScript
- Agregar tests unitarios
- Implementar logging
- Agregar documentación automática con Swagger

¡Feliz aprendizaje con Flask!
