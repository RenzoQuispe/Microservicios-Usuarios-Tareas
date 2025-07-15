-- Crear la tabla usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fotoperfil VARCHAR(255) DEFAULT '',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Insertar usuarios de ejemplo
INSERT INTO usuarios (username, email, password, fotoperfil)
VALUES 
    ('juanperez', 'juan@gmail.com', '123456780', ''),
    ('maria', 'maria@gmail.com', 'maria123', ''),
    ('carlos', 'carlos@gmail.com', 'carlos12345', '');
