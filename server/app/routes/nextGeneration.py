from flask import Blueprint, jsonify, request
from grid import grid

# Create a blueprint for the route
next_generation_bp = Blueprint("next_generation", __name__)


@next_generation_bp.route("/nextGeneration", methods=["GET"])
def next_generation():
    try:
        print(grid.cells[0][0].state)
        grid.update()  # Berechne die nächste Generation
        return jsonify(grid.to_dict())  # Sende das aktualisierte Gitter zurück
    except Exception as e:
        print(f"Error calculating next generation: {e}")
        return jsonify({"error": "Failed to calculate next generation"}), 500
