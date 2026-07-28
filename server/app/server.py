import os

from dotenv import load_dotenv

# Must run before the route imports below: supabasePatterns reads its
# credentials from the environment at import time.
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

from extensions import socketio
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from flask_socketio import emit
from grid import grid
from routes.addPattern import add_pattern_bp
from routes.applyPattern import apply_patterns_bp
from routes.deletePattern import delete_pattern_bp
from routes.getPatterns import send_patterns_bp
from routes.initializeRandom import initialize_random_bp
from routes.keyPress import key_press_bp
from routes.loadPattern import load_pattern_bp
from routes.mouseCoords import mouse_coords_bp
from routes.nextGeneration import next_generation_bp
from routes.resetGrid import reset_grid_bp

# Directory holding the built client (client/dist). When present, the server
# also serves the frontend, so everything is one origin on one port and the
# browser needs no CORS and no hardcoded API host.
CLIENT_DIST = os.environ.get(
    "CLIENT_DIST",
    os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "client", "dist")),
)

# Initialize app
app = Flask(__name__, static_folder=None)
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
app.register_blueprint(load_pattern_bp)


# Registered last so it cannot shadow the API routes above. Werkzeug also gives
# static rules like /initialize_grid priority over this <path:> converter rule.
@app.route("/", defaults={"path": "index.html"})
@app.route("/<path:path>")
def serve_client(path):
    if not os.path.isdir(CLIENT_DIST):
        return (
            jsonify(
                {
                    "error": "Client not built.",
                    "hint": "Run 'npm run build' in client/, or use docker compose up.",
                    "looked_in": CLIENT_DIST,
                }
            ),
            404,
        )
    # Real file (JS/CSS/images) if it exists, otherwise index.html so that
    # client-side routes like /sandbox survive a page reload.
    if path != "index.html" and os.path.isfile(os.path.join(CLIENT_DIST, path)):
        return send_from_directory(CLIENT_DIST, path)
    return send_from_directory(CLIENT_DIST, "index.html")


if __name__ == "__main__":
    # Port 5000 is taken by AirPlay Receiver on macOS, so default to 5001.
    port = int(os.environ.get("PORT", 5001))
    # The reloader is useful locally but must stay off in a container.
    debug = os.environ.get("FLASK_DEBUG", "1") == "1"
    socketio.run(app, host="0.0.0.0", port=port, debug=debug)
