from flask import Flask
from flask_cors import CORS

# Initialize app
app = Flask(__name__)

# Enable CORS for entire app
CORS(app)

if __name__ == "__main__":
    # Run the Flask app, which starts the server
    app.run(host="0.0.0.0", port=5000, debug=True)
