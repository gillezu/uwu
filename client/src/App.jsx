import React, { useState, useEffect } from "react";
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
import Navbar from "./components/Navbar";
import "./styles/components/slider.css";
import LibraryModal from "./components/LibraryModal";
import Stats from "./components/Stats";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [patterns, setPatterns] = useState({});

  const resetGeneration = () => setGeneration(-1);

  const [fps, setFPS] = useState(20);

  const handleFPSChange = (event) => {
    const newFPS = event.target.value;
    setFPS(newFPS);
  };

  useEffect(() => {
    socket.on("getPatterns", (response) => {
      setPatterns(response)
    });
  }, []);

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

  useEffect(() => {}, [data]);

  if (loading) {
    return (
      <h1 className="text-white text-3xl flex items-center justify-center h-screen">
        Loading <FontAwesomeIcon icon={faSpinner} className="ml-2 animate-spin" />
      </h1>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start h-screen w-screen bg-gradient-to-b from-black to-gray-900">
      <Navbar
        socket={socket}
        onOpenModal={() => {
          setIsModalOpen(true);
        }}
        onOpenStats={() => {
          setIsStatsOpen(!isStatsOpen);
        }}
      />
      {isModalOpen && <LibraryModal socket={socket} patterns={patterns} resetGeneration={resetGeneration} onClose={() => setIsModalOpen(false)} />}
      {isStatsOpen && <Stats stats={data.stats}/>}
      <div className="flex flex-col items-center justify-start h-[80vh] w-full">
        <div className="pulse my-16">
          <h1
            className="text-5xl text-transparent bg-gradient-to-r from-blue-500 
            via-purple-500 to-red-500 bg-clip-text move-gradient-text game-header"
          >
            Game of Life
          </h1>
        </div>
        <div className="w-full flex flex-col items-center">
          <div
            className="flex justify-between mb-6"
            style={{ width: `${data.width * data.cell_size}px` }}
          >
            <InitializeRandomButton
              socket={socket}
              resetGeneration={resetGeneration}
            />
            <StartPauseButton socket={socket} FPS={fps} />
            <ResetButton socket={socket} resetGeneration={resetGeneration} />
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
              cellfreezed={data.freezed}
              onCellClick={async (i, j) => {
                socket.emit("mouseCoords", { i, j });
                resetGeneration();
              }}
              onKeyPress={async (key, i, j) => {
                socket.emit("keyPress", { key, i, j });
              }}
            />
          </div>
          <div className="my-4 flex justify-between items-center w-full" style={{ width: `${data.width * data.cell_size}px` }}>
            <h1 className="text-2xl text-white">Generation: {generation}</h1>
            <h1 className="text-2xl text-white">FPS: {fps}</h1>
            <input
              className="custom-slider"
              type="range"
              min="1"
              max="50"
              value={fps}
              onChange={handleFPSChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
