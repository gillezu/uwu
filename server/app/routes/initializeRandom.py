from extensions import socketio
from flask import Blueprint
from flask_socketio import emit
from grid import grid

# Create a blueprint for the route
initialize_random_bp = Blueprint("initialize_random", __name__)


@socketio.on("initializeRandom")
def initialize_random():
    print("Grid initialized randomly")
    grid.initialize_random()
    # Don't print the whole grid — it dumps ~30 kB of JSON per click.
    socketio.emit("getGrid", grid.to_dict())
