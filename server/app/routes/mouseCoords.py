from flask import Blueprint
from flask_socketio import emit
from extensions import socketio
from grid import grid

# Create a blueprint for the route
mouse_coords_bp = Blueprint("mouse_coords", __name__)


@socketio.on("mouse-coords")
def receive_mouse_coords(data, callback=None):
    i, j = data.get("i"), data.get("j")
    grid.change_cell_state(i, j)
    emit("grid_updated", grid.to_dict(), broadcast=True)
    if callback:  # Rückgabe an den aufrufenden Client
        callback(grid.to_dict())