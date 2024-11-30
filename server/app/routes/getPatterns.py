from extensions import socketio
from flask import Blueprint
from flask_socketio import emit
from supabasePatterns import getPatterns

# Create a blueprint for the route
send_patterns_bp = Blueprint("sendPatterns", __name__)


@socketio.on("sendPatterns")
def send_patterns():
    print("patterns sent")
    socketio.emit("getPatterns", getPatterns())
