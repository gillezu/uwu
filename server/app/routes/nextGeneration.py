from extensions import socketio
from flask import Blueprint
from flask_socketio import emit
from grid import grid


# Create a blueprint for the route
next_generation_bp = Blueprint("next_generation", __name__)


@socketio.on("nextGeneration")
def next_generation():
    grid.update()
    socketio.emit("getGrid", grid.to_dict())