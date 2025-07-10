from pymongo import MongoClient
import os
import time
import sys

DB_HOST = os.getenv("DB_HOST", "tareas-db")
DB_PORT = int(os.getenv("DB_PORT", 27017))
DB_NAME = os.getenv("DB_NAME", "tareas_db")

MAX_RETRIES = 10
RETRY_DELAY = 3

def connect_to_mongo_with_retry():
    retries = 0
    while retries < MAX_RETRIES:
        try:
            client = MongoClient(
                host=DB_HOST,
                port=DB_PORT,
                serverSelectionTimeoutMS=2000
            )
            client.server_info()

            existing_dbs = client.list_database_names()
            if DB_NAME not in existing_dbs:
                print(f"Base de datos '{DB_NAME}' aún no existe. Sera creada al insertar documentos.")

            print("Conexión exitosa a MongoDB :D")
            return client[DB_NAME]
        except Exception as e:
            retries += 1
            print(f"Aun no hay conexion con MongoDB. Reintentando")
            time.sleep(RETRY_DELAY)
    print("No se pudo conectar a MongoDB. Abortando.")
    sys.exit(1)

db = connect_to_mongo_with_retry()
