import { useState } from "react";
import "./App.css";
import axios from "axios";
import Grid from "./components/Grid";
import Cell from "./components/Cell";

function App() {
  const [data, setData] = useState("");

  const fetchRouteApi = async () => {
    try {
      const response = await axios.get("/");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setResponse("Error fetching data");
    }
    console.log(data);
  };

  return (
    <>
      <Grid
        grid={data["cells"]}
        height={data["height"]}
        width={data["width"]}
        stats={data["stats"]}
        cellSize={data["cell_size"]}
      />
      <button onClick={fetchRouteApi}>click Me</button>
    </>
  );
}

export default App;
