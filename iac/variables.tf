variable "mongo_root_username" {
  default = "admin_tareas_service_db"
}

variable "mysql_root_password" {
  default = "contraseña12345"
}

variable "mongo_root_password" {
  default = "contraseña54321"
}

variable "mysql_database" {
  default = "usuarios_service_db"
}

variable "mongo_database" {
  default = "tareas_service_db"
}

variable "mongo_port" {
  default = 27017
}

variable "mysql_port" {
  default = 3306
}
