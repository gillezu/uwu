from flask_socketio import emit
from flask import Blueprint
from grid import grid
from extensions import socketio


# Create a blueprint for the route
next_generation_bp = Blueprint("next_generation", __name__)


@socketio.on("nextGeneration")
def next_generation(callback=None):
    grid.update()
    emit("grid_updated", grid.to_dict(),broadcast=True)
    if callback:  # Rückgabe an den aufrufenden Client
        callback(grid.to_dict())