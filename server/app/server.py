from test import *

from flask import Flask
from flask_cors import CORS

# Initialize app
app = Flask(__name__)

# Enable CORS for entire app
CORS(app)

grid = Grid(100, 100, 12)
grid.initialize_random()


@app.route("/")
def hello_world():
    return {"message": "Hello from backend"}, 200


if __name__ == "__main__":
    # Run the Flask app, which starts the server
    app.run(host="0.0.0.0", port=5000, debug=True)
