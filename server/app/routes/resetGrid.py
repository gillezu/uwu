from flask import Blueprint, jsonify, request
from grid import grid

# Create a blueprint for the route
reset_grid_bp = Blueprint("reset_grid", __name__)


@reset_grid_bp.route("/resetGrid", methods=["POST"])
def reset_grid():
    try:
        grid.reset_field()
        return jsonify(grid.to_dict()), 200
    except Exception as e:
        print(f"Error resetting grid: {e}")
        return jsonify({"error": "Failed to reset grid"}), 500
