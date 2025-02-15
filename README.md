
# Todo List App

## Requisitos Previos
- Node.js v22.14.0
- MySQL 8.0

## Configuración del Proyecto

## Base de Datos
1. Crear una base de datos llamada `todo_list_db`
2. Correr el script de la BD
    /script_db.sql

### Backend

1. Navegar al directorio backend
2. Crear archivo `.env` con las siguientes variables:
    ```PORT=3000
    JWT_SECRET=mK9x#P2$vL5nQ8zR4jH7@wY2
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=constantino
    DB_PASSWORD=cokuva
    DB_NAME=todo_list_db
    DB_CHARSET=utf8mb4

3. Instalar dependencias
    npm install

4. Iniciar el servidor
    npm start

### Frontend

1. Navegar al directorio frontend
2. Crear archivo `.env` con las siguientes variables:
    ```PORT=3001

3. Instalar dependencias
    npm install

4. Iniciar la applicacion
    npm start



## Acceso a la Aplicación
- Frontend: http://localhost:3001
- Backend: http://localhost:3000



## Notas Importantes
- La aplicación requiere Node.js versión 22.14.0
- Asegúrese de tener MySQL 8.0 instalado y corriendo
- Las credenciales proporcionadas son solo para desarrollo
- Ejecute primero el backend y luego el frontend




## Características Implementadas

### Backend (Node.js + Express)
- Autenticación JWT
- API RESTful protegida
- Modelos de datos con Sequelize
- Middleware de autenticación

### Frontend (React)
- Gestión de estado con Redux
- Navegación con React Router
- Diseño con Material-UI
- Formularios validados

### API Endpoints
- Autenticación:
  - POST /auth/register - Registro de usuario
  - POST /auth/login - Inicio de sesión

- Tareas (requieren autenticación):
  - GET /tasks - Listar tareas
  - POST /tasks - Crear tarea
  - PUT /tasks/:id - Actualizar tarea
  - DELETE /tasks/:id - Eliminar tarea




    ```markdown
   | Método | Endpoint             | Descripción                  |
   | ------ | -------------------- | ---------------------------- |
   | POST   | `/auth/register`    | Registro de usuario          |
   | POST   | `/auth/login`       | Inicio de sesión             |
   | GET    | `/tasks`            | Listar tareas                |
   | POST   | `/tasks`            | Crear tarea                  |
   | PUT    | `/tasks/:id`        | Actualizar tarea             |
   | DELETE | `/tasks/:id`        | Eliminar tarea               |