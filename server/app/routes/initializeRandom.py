from flask import Blueprint
from flask_socketio import emit
from grid import grid
from extensions import socketio

# Create a blueprint for the route
initialize_random_bp = Blueprint("initialize_random", __name__)


@socketio.on("initializeRandom")
def initialize_random(callback=None):
    grid.initialize_random()
    print("Grid initialized randomly")
    emit("grid_updated", grid.to_dict(), broadcast=True)
    if callback:  # Rückgabe an den aufrufenden Client
        callback(grid.to_dict())
