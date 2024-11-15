import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Grid from "./components/Grid";

function App() {
  const [data, setData] = useState("");

  const fetchRouteApi = async () => {
    try {
      const response = await axios.get("/initializeRandom");
      setData(response.data);
    } 
    catch (error) {
      console.error("Error fetching data: ", error);
      setResponse("Error fetching data");
    }
    console.log(data);
  };

  const updateGrid = (newGridData) => {
    setData(newGridData);  // Aktualisiert den Gitterzustand
  };

  useEffect(() => {
    const fetchInitialGrid = async () => {
      try {
        const response = await axios.get("/");
        setData(response.data);
      } 
      catch (error) {
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
      <div>
        <Grid
          grid={data["cells"]}
          height={data["height"]}
          width={data["width"]}
          stats={data["stats"]}
          cellSize={data["cell_size"]}
          onUpdateGrid={updateGrid}
        />
      </div>
    </>
  );
}

export default App;
