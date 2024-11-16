from flask import Blueprint, jsonify, request
from grid import grid

# Create a blueprint for the route
reset_grid_bp = Blueprint("reset_grid", __name__)


@reset_grid_bp.route("/resetGrid", methods=["POST"])
def initialize_random():
    data = request.json
    data.reset_field()
    return jsonify(grid.to_dict()), 200
