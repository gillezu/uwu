from test import *

from flask import Flask, jsonify
from flask_cors import CORS

# Initialize app
app = Flask(__name__)

# Enable CORS for entire app
CORS(app, origins="http://localhost:5173")


grid = Grid(100, 100, 12)
grid.initialize_random()


@app.route("/", methods=["GET"])
def hello_world():
    return jsonify(grid.to_dict()), 200


if __name__ == "__main__":
    # Run the Flask app, which starts the server
    app.run(host="0.0.0.0", port=5000, debug=True)

print("hello")