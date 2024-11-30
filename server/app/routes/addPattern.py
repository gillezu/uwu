from extensions import socketio
from flask import Blueprint
from flask_socketio import emit
from grid import grid
from supabasePatterns import addPattern, getPatterns

# Create a blueprint for the route
add_pattern_bp = Blueprint("addPattern", __name__)


@socketio.on("addPattern")
def add_patterns(patternName):
    rle = grid.to_rle()
    newPattern = {"Name": patternName, "Code": rle}
    addPattern(newPattern)
    socketio.emit("getPatterns", getPatterns())

