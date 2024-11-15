from grid import grid
from routes.initializeRandom import initialize_random_bp
from flask import Flask, request, jsonify
from flask_cors import CORS

# Initialize app
app = Flask(__name__)

# Enable CORS for entire app
CORS(app, origins="http://localhost:5173")


@app.route("/", methods=["GET"])
def hello_world():
    return jsonify(grid.to_dict()), 200


app.register_blueprint(initialize_random_bp)

@app.route('/mouse-coords', methods=['POST'])
def receive_mouse_coords():
    data = request.json  # Empfange die Mauskoordinaten
    i, j, x, y = data.get('i'), data.get('j'), data.get('x'), data.get('y')
    print(f"grid={grid.cells[i][j].state}")
    grid.change_cell_state(i, j)
    print(f"Empfangene Koordinaten: i={i}, j={j}, x={x}, y={y}, grid={grid.cells[i][j].state}")
    # Verarbeite die Koordinaten
    return hello_world()

if __name__ == "__main__":
    # Run the Flask app, which starts the server
    app.run(host="0.0.0.0", port=5000, debug=True)

