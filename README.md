# Microservicios Usuarios-Tareas

## Diagrama del proyecto
```
                    --------------------------
                    |        Cliente         |
                    --------------------------
                                |
                    -------------------------------
                    |                             |
                    v                             v
        ------------------------      -------------------------
        |   service-usuarios   |      |     service-tareas    |
        |   Node.js - Express  |      |   Flask - Python      |
        ------------------------      -------------------------
                    |                             |
                    v                             v
        ------------------------      -------------------------
        |    usuarios-db       |      |      tareas-db        |
        |      MySQL           |      |      MongoDB          |
        ------------------------      -------------------------
```
### service-usuarios (MySQL + Node.js + Express + TypeScript):
- Expone rutas para autenticación (/register, /login, /logout)
- Autentica con email/contraseña.
- Genera un JWT con el userId dentro del payload.
- El JWT se entrega al cliente

### service-tareas (MongoDB + Flask):
- Expone rutas CRUD para tareas, protegidas por JWT
- No consulta directamente a service-usuarios
- Confía en el JWT que recibe con cada request
- Extrae userId del JWT y lo usa como "creado_por" en MongoDB

## Iniciar con Docker

```
docker-compose up --build
```