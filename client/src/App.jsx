import { useState, useEffect } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faSpinner } from "@fortawesome/free-solid-svg-icons";
import ResetButton from "./components/controllers/ResetButton";
import StartPauseButton from "./components/controllers/StartPauseButton";
import useFPS from "./hooks/useFPS";
import "./styles/animations/pulse.css";
import "./styles/animations/moveGradient.css";
import "./styles/components/gameHeader.css";
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

  const resetGeneration = () => setGeneration(-1);

  const [fps, setFPS] = useState(30);

  const handleFPSChange = (event) => {
    const newFPS = event.target.value;
    setFPS(newFPS);
  };

  useEffect(() => {
    socket.on("getGrid", (response) => {
      setData(response);
      setGeneration((prevCount) => prevCount + 0.5); // Keine Ahnung warum 0.5, Funktion wird anscheinend 2x ausgeführt
    });
  }, []);

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
    return <h1>Loading <FontAwesomeIcon icon={faSpinner} /></h1>;
  };
  
  return (
    <>
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
            <InitializeRandomButton socket={socket} resetGeneration={resetGeneration}/>
            <StartPauseButton
              socket={socket}
              FPS={fps}
            />
            <ResetButton
              socket={socket}
              resetGeneration={resetGeneration}
            />
          </div>
          <div className="my-2">
            <GridCanvas
              grid={data.cells || Array(data.height).fill(Array(data.width).fill(0))}
              cellSize={data.cell_size}
              width={data.width} // Übergebe die Breite des Canvas
              height={data.height} // Übergebe die Höhe des Canvas
              cellAges={
                data.cell_age || Array(data.height).fill(Array(data.width).fill(0))
              }
              onCellClick={async (i, j) => {
                  socket.emit("mouseCoords", { i, j });
                  resetGeneration();
              }}
              onKeyPress={async (i, j) => {
                socket.emit("mouseCoords", { i, j });
            }}
            />
          </div>
          <div className="my-2 flex justify-between">
            <h1 className="text-3xl">Generation: {generation}</h1>
            <h1 className="text-3xl">FPS: {fps}</h1>
            <input
              type="range"
              min="1"
              max="50"
              value={fps}
              onChange={handleFPSChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
