resource "kubernetes_config_map" "tareas_mongo_init_script" {
  metadata {
    name = "tareas-mongo-init-script"
  }

  data = {
    "init.js" = <<-EOT
      db = db.getSiblingDB('tareasdb');

      db.tareas.insertMany([
        { titulo: "Tarea inicial 1", descripcion: "tarea 1 es ..." },
        { titulo: "Tarea inicial 2", descripcion: "tarea 2 es ..." }
      ]);
    EOT
  }
}
# Deployment para MongoDB (base de datos de tareas)
resource "kubernetes_deployment" "mongo_tareas_db" {
  metadata {
    name = "mongo-tareas-db"
    labels = {
      app = "mongo-tareas"
    }
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "mongo-tareas"
      }
    }

    template {
      metadata {
        labels = {
          app = "mongo-tareas"
        }
      }

      spec {
        container {
            name  = "mongo"
            image = "mongo:6.0"

            port {
                container_port = var.mongo_port
            }
            env {
            name  = "MONGO_INITDB_ROOT_USERNAME"
            value = var.mongo_root_username
            }

            env {
            name  = "MONGO_INITDB_ROOT_PASSWORD"
            value = var.mongo_root_password
            }

            env {
            name  = "MONGO_INITDB_DATABASE"
            value = var.mongo_database
            }

            volume_mount {
                name       = "mongo-data"
                mount_path = "/data/db"
            }

            volume_mount {
                name       = "mongo-init-script"
                mount_path = "/docker-entrypoint-initdb.d"
                read_only  = true
            }
        }

        volume {
          name = "mongo-data"
          empty_dir {}
        }

        volume {
          name = "mongo-init-script"
          config_map {
            name = kubernetes_config_map.tareas_mongo_init_script.metadata[0].name
            items {
              key  = "init.js"
              path = "init.js"
            }
          }
        }
      }
    }
  }
}
# Service para MongoDB (acceso interno)
resource "kubernetes_service" "mongo_tareas_db" {
  metadata {
    name = "mongo-tareas-db"
  }

  spec {
    selector = {
      app = "mongo-tareas"
    }

    port {
      port        = var.mongo_port
      target_port = var.mongo_port
    }

    cluster_ip = "None"
  }
}
# kubectl exec -it <mongo-pod-name> -- bash