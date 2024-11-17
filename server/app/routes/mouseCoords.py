from flask import Blueprint, jsonify, request
from grid import grid

# Create a blueprint for the route
mouse_coords_bp = Blueprint("mouse_coords", __name__)


@mouse_coords_bp.route("/mouse-coords", methods=["POST"])
def receive_mouse_coords():
    data = request.json  # Empfange die Mauskoordinaten
    i, j, x, y = data.get("i"), data.get("j"), data.get("x"), data.get("y")
    print(f"grid={grid.cells[i][j].state}")
    grid.change_cell_state(i, j)
    print(
        f"Empfangene Koordinaten: i={i}, j={j}, x={x}, y={y}, grid={grid.cells[i][j].state}"
    )
    # Verarbeite die Koordinaten
    return jsonify(grid.to_dict()), 200