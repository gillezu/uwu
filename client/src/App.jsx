import { useState, useEffect } from "react";
import "./App.css";
import { io } from "socket.io-client";
/*import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import ResetButton from "./components/controllers/ResetButton";
import StartPauseButton from "./components/controllers/StartPauseButton";
import useFPS from "./hooks/useFPS";
import "./styles/animations/pulse.css";
import "./styles/animations/moveGradient.css";
import "./styles/components/gameHeader.css";*/
import axios from "axios";
import { socket } from "./utils/socketioSetup";
import InitializeRandomButton from "./components/controllers/InitializeRandomButton";
import GridCanvas from "./components/GridCanvas";

function App() {
  const [data, setData] = useState({
    cell_age: [[]],
    cell_size: 5,
    cells: [[]],
    height: 10,
    width: 10,
  });

  const [loading, setLoading] = useState(true);
  const [generation, setGeneration] = useState(0);

  const resetGeneration = () => setGeneration(0);

  const [fps, setFPS] = useState(10);

  const handleFPSChange = (event) => {
    const newFPS = event.target.value;
    setFPS(newFPS);
  };

  const updateGrid = (newGridData) => {
    setData(newGridData); // Aktualisiert den Gitterzustand
    //setGeneration((prevCount) => prevCount + 1);
    // console.log(data);
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
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInitialGrid();
  }, []);

  useEffect(() => {
    console.log(data);
    console.log(loading);
  }, [data]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>Hi</h1>
      <InitializeRandomButton socket={socket} onUpdateGrid={updateGrid} />
      <GridCanvas
        grid={data.cells || Array(data.height).fill(Array(data.width).fill(0))}
        cellSize={data.cell_size}
        width={data.width} // Übergebe die Breite des Canvas
        height={data.height} // Übergebe die Höhe des Canvas
        cellAges={
          data.cell_age || Array(data.height).fill(Array(data.width).fill(0))
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
          >*/
      /*<ResetButton
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
