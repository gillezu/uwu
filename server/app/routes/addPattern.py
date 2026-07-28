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
    try:
        addPattern(newPattern)
        patterns = getPatterns()
    except Exception as e:
        print(f"Error adding pattern {patternName}: {e}")
        patterns = {}
    socketio.emit("getPatterns", patterns)
