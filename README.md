# Microservicios Usuarios-Tareas

## Diagrama del proyecto
```
                                      --------------------------
                                      |        Cliente         |
                                      --------------------------
                                                  |
                    --------------------------------------------------------------
                    |                             |                              |
                    v                             v                              v
        ------------------------         -------------------------    -------------------------
        |   service-usuarios   |         |   service-tareas      |    |   service-reportes     |
        |   Node.js - Express  |<--JWT-->|   Flask - Python      |    |         Go             |
        ------------------------         -------------------------    --------------------------
                        |                             |                          |
                        v                             v                          |
        ------------------------         -------------------------               | /tareas
        |    usuarios-db       |         |      tareas-db        |               |
        |      MySQL           |         |      MongoDB          |     <----------
        ------------------------         -------------------------
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

### service-reportes (Go):
- Llama internamente a GET /tareas del microservicio de tareas
- Genera un resumen-reporte de tareas del usuario 

## Iniciar con Docker

```
https://github.com/RenzoQuispe/Microservicios-Usuarios-Tareas.git
cd Microservicios-Usuarios-Tareas
docker-compose up --build
```