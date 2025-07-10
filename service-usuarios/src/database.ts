import mysql from 'mysql2/promise';

export const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export async function testDBConnection() {
    try {
        const connection = await db.getConnection();
        await connection.ping();
        console.log('Conexion exitosa a la base de datos MySQL :D');
        connection.release();
    } catch (error) {
        console.error('Error al conectar con la base de datos MySQL:', error);
    }
}