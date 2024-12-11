from flask import Blueprint
from flask_socketio import emit
from extensions import socketio
from grid import grid

# Create a blueprint for the route
key_press_bp = Blueprint("key_press", __name__)


@socketio.on("keyPress")
def receive_spell_data(data):
    key, i, j = data.get("key"), data.get("i"), data.get("j")
    grid.apply_spell(key, i, j)
    socketio.emit("getGrid", grid.to_dict())
