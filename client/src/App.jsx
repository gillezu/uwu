import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Grid from "./components/Grid";
import ResetButton from "./components/controllers/ResetButton";
import StartPauseButton from "./components/controllers/StartPauseButton";
import GridCanvas from "./components/GridCanvas";
import useFPS from "./hooks/useFPS";

function App() {
  const [data, setData] = useState({
    cells: [],
    cell_age: [],
    cell_size: 20,
    width: 0,
    height: 0,
  });
  const [generation, setGeneration] = useState(0)

  const updateGrid = (newGridData) => {
    setData(newGridData); // Aktualisiert den Gitterzustand
    setGeneration((prevCount) => (prevCount + 1))
  };

  const fetchRouteApi = async () => {
    try {
      const response = await axios.post("/initializeRandom");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setResponse("Error fetching data");
    }
    console.log(data);
  };

  useEffect(() => {
    const fetchInitialGrid = async () => {
      try {
        const response = await axios.get("/");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setResponse("Error fetching data");
      }
      console.log(data);
    };
    fetchInitialGrid();
  }, []);

  return (
    <>
      <button onClick={fetchRouteApi}>Initialize Random</button>
      <ResetButton onUpdateGrid={updateGrid} />
      <StartPauseButton onUpdateGrid={updateGrid} />
      <div>
        <GridCanvas
          grid={data.cells}
          cellSize={data.cell_size}
          width={data.width} // Übergebe die Breite des Canvas
          height={data.height} // Übergebe die Höhe des Canvas
          cellAges={data.cell_age}
          onCellClick={async (i, j) => {
            try {
              const response = await axios.post("/mouse-coords", { i, j });
              updateGrid(response.data);
            } catch (error) {
              console.error("Error updating cell state: ", error);
            }
          }}
        />
      </div>
      <div>Generation: {generation}</div>
    </>
  );
}

export default App;
