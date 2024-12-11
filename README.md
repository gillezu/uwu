# 🌌 **Game of Life in React** 🚀

Welcome to the **Game of Life** project! This project is a React-based implementation of **Conway's Game of Life**, a fascinating cellular automaton simulation that demonstrates how simple rules can create intricate patterns and dynamic behaviors.

The frontend is built using **React**, **Vite**, and **Tailwind CSS** for a fast and modern development experience. The backend is powered by **Python** and communicates with the client through **WebSockets**, ensuring real-time interactions and updates.

---

## 📜 **Project Status** 

- ⚠️ **Currently in Development**  
- 🔧 The latest version is available on the **`test` branch**.  
- 🧪 Features are still being **tested and implemented**.

---

## 📜 **Dependencies**

Dependencies are located in each branch for specific versions:

- 📦 **Frontend**  
  - `package.json` – React dependencies (JavaScript).

- 🐍 **Backend**  
  - `requirements.txt` – Python-based dependencies.

Make sure to check these files in the respective branches to ensure the correct dependencies for that version of the project.

---

## 📂 **Project Structure** 
- **/client** - Contains the React frontend 
- **/server** - Contains the backend server logic

---


### 📝 **Branches**

- **`test` branch** – Contains the latest experimental updates.
- Each branch contains its own `requirements.txt` and `package.json` specifying dependencies for that version.

---

## 🛠️ **How to Run the Project Locally**  

You will need **two terminals** open to run the client and server separately.

---

### Terminal 1 – **React Client** 🔥

1. Open the first terminal.

2. Navigate to the client directory:

```bash
cd client
```

3.Install the client dependencies:

```bash
npm install
```

4. Start the React client application:

```bash
npm run dev
```

✅ The client should now be running and accessible at http://localhost:5137.

### Terminal 2 – Backend Server 🐍

1. Open the second terminal.

2. Navigate to the server directory:

```bash
cd server
pip install -r requirements.txt
cd app
python server.py
```

✅ The server should now be running and ready to handle API requests from the client.

---

## ✨ Future Aims and Ideas

### 🔍 General Features

- **Zooming**  
- **Level-based, Playable Game** (2 levels)  
- **Predator, Explosive, Healer, Virus Cells**  
- **Constants for Spells**  
- **Background Visuals**  
- **Achievements**  
  - Stable Patterns  
- **Navbar Styling Enhancements**  
- **Morphing Blob in the Sidebar**  

### 🛠️ Code and Structure Improvements

- **Merge `main.py` and `test.py`**  
- **Modularize `main.py`**  
- **Update Pygame to the Latest Version**  

### 📈 Performance and Analytics

- **More Statistics and Performance Metrics**  
- **Heatmap for Activity Visualization**  

### 🎨 Visual Enhancements

- **Background Music Integration**  
- **Glow Effects & Spell Animations**  
- **3D Grids**  
- **Gravity Mechanics**

---



