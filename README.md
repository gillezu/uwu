🚀 Project Status

    The project is currently in development.
    The latest version is available on the test branch.
    Features are still being tested and implemented.

📜 Dependencies

    Dependencies are located in each branch for specific versions:
        package.json for React dependencies (JavaScript).
        requirements.txt for any Python-based dependencies.

    Make sure to check these files in the respective branches to ensure the correct dependencies for that version.

📂 Project Structure

    client/: Contains the React frontend.
    server/: Contains the backend server logic.
    Branches:
        The test branch contains the latest experimental updates.
        Each branch contains its own requirements.txt and package.json specifying dependencies for that version.

🛠️ How to Run the Project Locally

You need to have two terminals open to run the client and server separately.
Terminal 1: Running the React Client

    Open the first terminal.

    Navigate to the client directory:

cd client

    Install the client dependencies:

npm install

    Start the React client application:

npm run dev

    The client should now be running and accessible at http://localhost:5137.

Terminal 2: Running the Server (Backend)

    Open the second terminal.

    Navigate to the server directory:

cd server

    Install the backend dependencies:

pip install -r requirements.txt

    Navigate into the app folder:

cd app

    Start the backend server:

python server.py

    The server should now be running and ready to handle API requests from the client.
