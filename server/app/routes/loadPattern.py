from extensions import socketio
from flask import Blueprint
from flask_socketio import emit
from grid import grid

# Create a blueprint for the route
load_pattern_bp = Blueprint("load_pattern", __name__)


@socketio.on("loadPattern")
def loadPattern(data):
    grid.apply_rle_pattern(data)
    socketio.emit("getGrid", grid.to_dict())
    print(data)
