from flask import Blueprint, request, jsonify
from models.mongo import tareas_collection
from middlewares.auth import token_required
from bson import ObjectId
from datetime import datetime

tareas_bp = Blueprint('tareas', __name__)

# Crear tarea
@tareas_bp.route('/tareas', methods=['POST'])
@token_required
def crear_tarea():
    data = request.get_json()

    required_fields = ["titulo", "descripcion", "fecha"]
    if not all(field in data for field in required_fields):
        return jsonify({"message": "Faltan campos obligatorios: 'titulo', 'descripcion', 'fecha'"}), 400

    tarea = {
        "titulo": data["titulo"],
        "descripcion": data["descripcion"],
        "fecha": data["fecha"],
        "creado_por": request.user["userId"],
        "creado_en": datetime.utcnow()
    }

    result = tareas_collection.insert_one(tarea)
    return jsonify({"message": "Tarea creada", "id": str(result.inserted_id)}), 201

# Listar tareas
@tareas_bp.route('/tareas', methods=['GET'])
@token_required
def listar_tareas():
    usuario_id = request.user["userId"]
    tareas = list(tareas_collection.find({"creado_por": usuario_id}))
    
    if not tareas:
        return jsonify({"message": "No tienes tareas pendientes"}), 200

    for t in tareas:
        t["_id"] = str(t["_id"])
    return jsonify(tareas), 200

# Actualizar tarea
@tareas_bp.route('/tareas/<id>', methods=['PUT'])
@token_required
def actualizar_tarea(id):
    data = request.get_json()
    campos_validos = ["titulo", "descripcion", "fecha"]

    if not any(field in data for field in campos_validos):
        return jsonify({"message": "Debes enviar al menos un campo para actualizar"}), 400

    try:
        filtro = {"_id": ObjectId(id), "creado_por": request.user["userId"]}
        update = {"$set": {k: v for k, v in data.items() if k in campos_validos}}
        result = tareas_collection.update_one(filtro, update)

        if result.matched_count == 0:
            return jsonify({"message": "Tarea no encontrada o no tienes permiso"}), 404

        return jsonify({"message": "Tarea actualizada"}), 200
    except:
        return jsonify({"message": "ID inválido"}), 400

# Eliminar tarea
@tareas_bp.route('/tareas/<id>', methods=['DELETE'])
@token_required
def eliminar_tarea(id):
    try:
        result = tareas_collection.delete_one({
            "_id": ObjectId(id),
            "creado_por": request.user["userId"]
        })

        if result.deleted_count == 0:
            return jsonify({"message": "Tarea no encontrada o no tienes permiso"}), 404

        return jsonify({"message": "Tarea eliminada"}), 200
    except:
        return jsonify({"message": "ID inválido"}), 400
