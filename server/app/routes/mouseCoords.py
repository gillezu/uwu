from flask import Blueprint
from flask_socketio import emit
from extensions import socketio
from grid import grid

# Create a blueprint for the route
mouse_coords_bp = Blueprint("mouse_coords", __name__)


@socketio.on("mouseCoords")
def receive_mouse_coords(data):
    i, j = data.get("i"), data.get("j")
    grid.change_cell_state(i, j)
    socketio.emit("getGrid", grid.to_dict())