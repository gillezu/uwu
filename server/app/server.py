from extensions import socketio
from flask import Flask, jsonify
from flask_cors import CORS
from flask_socketio import emit
from grid import grid
from routes.addPattern import add_pattern_bp
from routes.applyPattern import apply_patterns_bp
from routes.deletePattern import delete_pattern_bp
from routes.getPatterns import send_patterns_bp
from routes.initializeRandom import initialize_random_bp
from routes.keyPress import key_press_bp
from routes.mouseCoords import mouse_coords_bp
from routes.nextGeneration import next_generation_bp
from routes.resetGrid import reset_grid_bp

# Initialize app
app = Flask(__name__)
socketio.init_app(app)  # Verbinde SocketIO mit der Flask-App
CORS(app)


@app.route("/initialize_grid", methods=["GET"])
def hello_world():
    print("http successfull")
    return jsonify(grid.to_dict()), 200


app.register_blueprint(initialize_random_bp)
app.register_blueprint(reset_grid_bp)
app.register_blueprint(mouse_coords_bp)
app.register_blueprint(next_generation_bp)
app.register_blueprint(key_press_bp)
app.register_blueprint(send_patterns_bp)
app.register_blueprint(apply_patterns_bp)
app.register_blueprint(add_pattern_bp)
app.register_blueprint(delete_pattern_bp)


if __name__ == "__main__":
    # Run the Flask app, which starts the server
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)
