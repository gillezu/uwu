from extensions import socketio
from flask import Blueprint
from flask_socketio import emit
from supabasePatterns import getPatterns

# Create a blueprint for the route
send_patterns_bp = Blueprint("sendPatterns", __name__)


@socketio.on("sendPatterns")
def send_patterns():
    try:
        patterns = getPatterns()
    except Exception as e:
        # Without this the client waits forever for a "getPatterns" that never comes.
        print(f"Error fetching patterns: {e}")
        patterns = {}
    print(f"patterns sent ({len(patterns)})")
    socketio.emit("getPatterns", patterns)
