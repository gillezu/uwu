import React from "react";
import axios from "axios";

function ResetButton({ onUpdateGrid }) {
  const resetGrid = async () => {
    try {
      const response = await axios.post("/resetGrid");
      console.log("Server response:", response.data);
      console.log(response.data)
      onUpdateGrid(response.data);
    } catch (error) {
      console.log("Error posting data:", error);
    }
  };
  return <button onClick={resetGrid}>Reset Grid</button>;
}

export default ResetButton;
