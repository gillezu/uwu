from flask import Blueprint
from flask_socketio import emit
from extensions import socketio
from grid import grid

# Create a blueprint for the route
key_press_bp = Blueprint("key_press", __name__)


@socketio.on("keyPress")
def receive_mouse_coords(data):
    i, j, type = data.get("i"), data.get("j"), data.get("type")
    grid.change_cell_state(i, j)
    socketio.emit("getGrid", grid.to_dict())
