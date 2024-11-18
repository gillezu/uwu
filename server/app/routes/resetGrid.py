from flask_socketio import emit
from flask import Blueprint
from grid import grid
from extensions import socketio

# Create a blueprint for the route
reset_grid_bp = Blueprint("reset_grid", __name__)


@socketio.on("resetGrid")
def reset_grid(callback=None):
    grid.reset_field()
    print("Grid reset")
    emit("grid_updated", grid.to_dict(), broadcast=True)
    if callback:  # Rückgabe an den aufrufenden Client
        callback(grid.to_dict())
