from pymongo import MongoClient
import os

client = MongoClient(os.getenv("DB_HOST"))
db = client[os.getenv("DB_NAME", "tareas_db")]
tareas_collection = db["tareas"]
