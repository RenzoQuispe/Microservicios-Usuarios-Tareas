from flask import Flask, jsonify
from database import db
import os

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({"mensaje": "Service-tareas activo"})

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5001))
    app.run(host='0.0.0.0', port=port)
