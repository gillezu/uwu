import { useState, useEffect } from "react";
import "./App.css";
import { io } from "socket.io-client";
/*import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import ResetButton from "./components/controllers/ResetButton";
import StartPauseButton from "./components/controllers/StartPauseButton";
import GridCanvas from "./components/GridCanvas";
import useFPS from "./hooks/useFPS";
import InitializeRandomButton from "./components/controllers/InitializeRandomButton";
import "./styles/animations/pulse.css";
import "./styles/animations/moveGradient.css";
import "./styles/components/gameHeader.css";*/
import axios from "axios";

const socket = io("http://localhost:5000"); // Verbindung zum Server

function App() {
  const [data, setData] = useState({
    cells: [[]],
    cell_age: [[]],
    cell_size: 5,
    width: 10,
    height: 10,
  });
  const [generation, setGeneration] = useState(0);

  const resetGeneration = () => setGeneration(0);

  const [fps, setFPS] = useState(10);

  const handleFPSChange = (event) => {
    const newFPS = event.target.value;
    setFPS(newFPS);
  };

  const updateGrid = (newGridData) => {
    setData(newGridData); // Aktualisiert den Gitterzustand
    setGeneration((prevCount) => prevCount + 1);
  };

  /* Socket.IO: Registriere Event-Listener für den Server
  useEffect(() => {
    // Empfange aktualisierte Gitterdaten vom Server
    socket.on("grid_updated", (updatedGrid) => {
      setData(updatedGrid);
    });

    return () => {
      socket.off("grid_updated");
    };
  }, []);*/

  useEffect(() => {
    const fetchInitialGrid = async () => {
      try {
        const response = await axios.get("/initialize_grid");
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
      console.log(data);
    };
    fetchInitialGrid();
  }, []);

  return (
    <>
      <h1>Hi</h1>
      {/*
      <div className="flex flex-col items-center justify-start h-[80vh]">
        <div className="pulse my-20">
          <h1
            className="text-5xl text-transparent bg-gradient-to-r from-blue-500 
            via-purple-500 to-red-500 bg-clip-text move-gradient-text game-header"
          >
            Game of Life
          </h1>
        </div>
        <div className="my-20">
          <div
            className="flex justify-between my-2"
            style={{ width: `${data.width * data.cell_size}px` }}
          >
            <InitializeRandomButton socket={socket} onUpdateGrid={updateGrid} />
            <ResetButton
              socket={socket}
              onUpdateGrid={updateGrid}
              resetGeneration={resetGeneration}
            />
            <StartPauseButton
              socket={socket}
              onUpdateGrid={updateGrid}
              FPS={fps}
            />
          </div>
          <div className="my-2">
            <GridCanvas
              grid={
                data.cells || Array(data.height).fill(Array(data.width).fill(0))
              }
              cellSize={data.cell_size}
              width={data.width} // Übergebe die Breite des Canvas
              height={data.height} // Übergebe die Höhe des Canvas
              cellAges={
                data.cell_age ||
                Array(data.height).fill(Array(data.width).fill(0))
              }
              onCellClick={async (i, j) => {
                try {
                  const response = socket.emit("mouse_coords", { i, j });
                  updateGrid(response.data);
                } catch (error) {
                  console.error("Error updating cell state: ", error);
                }
              }}
            />
          </div>
          <div className="my-2 flex justify-between">
            <h1 className="text-3xl">Generation: {generation}</h1>
            <input
              type="range"
              min="1"
              max="30"
              value={fps}
              onChange={handleFPSChange}
            />
          </div>
        </div>
      </div>*/}
    </>
  );
}

export default App;
