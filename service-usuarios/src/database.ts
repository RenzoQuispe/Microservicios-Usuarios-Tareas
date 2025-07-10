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

const MAX_RETRIES = 10;
const RETRY_DELAY_MS = 3000;

export async function testDBConnection() {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      const connection = await db.getConnection();
      await connection.ping();
      connection.release();
      console.log("Conexión exitosa a la base de datos MySQL :D");
      return;
    } catch (error: any) {
      retries++;
      console.error("Aun no hay conexion a la base de datos. Reintentando...");
      if (retries === MAX_RETRIES) {
        console.error("No se pudo conectar tras múltiples intentos. Abortando...");
        process.exit(1);
      }
      await new Promise(res => setTimeout(res, RETRY_DELAY_MS));
    }
  }
}
