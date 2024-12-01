from extensions import socketio
from flask import Blueprint
from flask_socketio import emit
from supabasePatterns import deletePattern

delete_pattern_bp = Blueprint("deletePattern", __name__)


@socketio.on("deletePattern")
def delete_pattern(data):
    deletePattern(data["name"])
    print(f"pattern {data["name"]} deleted")
