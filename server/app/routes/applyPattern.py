from extensions import socketio
from flask import Blueprint
from flask_socketio import emit
from grid import grid

# Create a blueprint for the route
apply_patterns_bp = Blueprint("applyPattern", __name__)


@socketio.on("applyPattern")
def apply_patterns(data):
    code = data.get("code")
    print(code)
    grid.apply_rle_pattern(code)
    print("pattern applied")
    socketio.emit("getGrid", grid.to_dict())
