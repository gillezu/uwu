from grid import grid
from flask import Blueprint, jsonify

# Create a blueprint for the route
initialize_random_bp = Blueprint("initialize_random", __name__)


@initialize_random_bp.route("/initializeRandom", methods=["GET"])
def initialize_random():
    grid.initialize_random()
    return jsonify(grid.to_dict()), 200
