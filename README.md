# Microservicios Usuarios-Tareas

## Diagrama del proyecto
```
                         --------------------------
                         |    NGINX / FRONTEND    |
                         --------------------------
                                    |
                                    v
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
## Iniciar con Docker

```
docker-compose up --build
```