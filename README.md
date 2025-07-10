# Microservicios Usuarios-Tareas

## Diagrama del sistema
```
                             ┌──────────────────────┐
                             │    Cliente (Postman) │
                             └──────────┬───────────┘
                                        │
             ┌──────────────────────────┼────────────────────────────┐
             │                          │                            │
 ┌───────────────────────┐   ┌──────────────────────┐     ┌──────────────────────┐
 │ microservicio-usuarios│   │ microservicio-tareas │     │  docker-compose.yml  │
 │  (Puerto 3001)        │   │   (Puerto 3002)      │     │ (orquestador local)  │
 └─────────┬─────────────┘   └────────────┬─────────┘     └──────────────────────┘
           │                              │
    ┌──────┴──────┐                ┌──────┴──────┐
    │   MySQL     │                │   MongoDB   │
    │ usuarios_db │                │ tareas_db   │
    └─────────────┘                └─────────────┘

```
## Iniciar con Docker

```
docker-compose up --build
```