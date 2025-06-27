# ConfigMap con init.sql para base de datos de usuarios
resource "kubernetes_config_map" "usuarios_mysql_init_sql" {
  metadata {
    name = "usuarios-mysql-init-sql"
  }

  data = {
    "init.sql" = <<-EOT
      CREATE TABLE IF NOT EXISTS usuarios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );

      INSERT INTO usuarios (username, email,password) VALUES
        ('Renzo', 'renzo@gmail.com','renzo123'),
        ('Daniel', 'daniel@gmail.com','daniel123');
    EOT
  }
}
# Deployment para MySQL (base de datos de usuarios)
resource "kubernetes_deployment" "mysql_usuarios_db" {
  metadata {
    name = "mysql-usuarios-db"
    labels = {
      app = "mysql-usuarios"
    }
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "mysql-usuarios"
      }
    }

    template {
      metadata {
        labels = {
          app = "mysql-usuarios"
        }
      }

      spec {
        container {
          name  = "mysql"
          image = "mysql:8.0"

          port {
            container_port = var.mysql_port
          }

          env {
            name  = "MYSQL_ROOT_PASSWORD"
            value = var.mysql_root_password
          }

          env {
            name  = "MYSQL_DATABASE"
            value = var.mysql_database
          }

          volume_mount {
            name       = "init-sql"
            mount_path = "/docker-entrypoint-initdb.d"
            read_only  = true
          }

          volume_mount {
            name       = "mysql-data"
            mount_path = "/var/lib/mysql"
          }
        }

        volume {
          name = "init-sql"
          config_map {
            name = kubernetes_config_map.usuarios_mysql_init_sql.metadata[0].name
            items {
              key  = "init.sql"
              path = "init.sql"
            }
          }
        }

        volume {
          name = "mysql-data"
          empty_dir {}
        }
      }
    }
  }
}
# Service para MySQL (base de datos de usuarios)
resource "kubernetes_service" "mysql_usuarios_db" {
  metadata {
    name = "mysql-usuarios-db"
  }

  spec {
    selector = {
      app = "mysql-usuarios"
    }

    port {
      port        = var.mysql_port
      target_port = var.mysql_port
    }

    cluster_ip = "None"
  }
}
# kubectl exec -it <mysql-pod-name> -- bash
