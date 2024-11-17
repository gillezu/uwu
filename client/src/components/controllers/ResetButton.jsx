import React from "react";
import axios from "axios";

function ResetButton({ onUpdateGrid, resetGeneration }) {
  const resetGrid = async () => {
    try {
      const response = await axios.post("/resetGrid");
      console.log("Server response:", response.data);
      console.log(response.data);
      onUpdateGrid(response.data);
      resetGeneration();
    } catch (error) {
      console.log("Error posting data:", error);
    }
  };
  return (
    <button onClick={resetGrid} className="w-[30%]">
      Reset Grid
    </button>
  );
}

export default ResetButton;
