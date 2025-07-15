from functools import wraps
from flask import request, jsonify
import jwt
import os

JWT_SECRET = os.getenv("JWT_SECRET")

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        
        print("Cookies recibidas:", request.cookies)
        token = None

        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]
            
        elif 'jwt_' in request.cookies:
            token = request.cookies.get('jwt_')

        if not token:
            return jsonify({"message": "Token faltante"}), 401

        try:
            data = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            request.user = data
        except Exception as e:
            return jsonify({"message": "Token inválido"}), 401

        return f(*args, **kwargs)

    return decorated
