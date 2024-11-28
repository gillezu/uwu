from extensions import socketio
from flask import Blueprint
from flask_socketio import emit
from pattern_library import patterns
from grid import grid

# Create a blueprint for the route
add_pattern_bp = Blueprint("addPattern", __name__)


@socketio.on("addPattern")
def add_patterns(patternName):
    rle = grid.to_rle()
    patterns[patternName] = rle
    print("pattern added| " + patternName + ": " + patterns[patternName])
    socketio.emit("getPatterns", patterns)