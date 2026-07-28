from extensions import socketio
from flask import Blueprint
from flask_socketio import emit
from supabasePatterns import deletePattern, getPatterns

delete_pattern_bp = Blueprint("deletePattern", __name__)


@socketio.on("deletePattern")
def delete_pattern(data):
    name = data["name"]
    try:
        deletePattern(name)
        patterns = getPatterns()
    except Exception as e:
        print(f"Error deleting pattern {name}: {e}")
        return
    print(f"pattern {name} deleted")
    socketio.emit("getPatterns", patterns)
