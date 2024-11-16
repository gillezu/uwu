import React from "react";
import axios from "axios";

function ResetButton({ grid }) {
  const resetGrid = async () => {
    try {
      const response = axios.post("/resetGrid", grid);
      console.log("Server response:", response.data);

      onUpdateGrid(response.data);
    } catch (error) {
      console.log("Error posting data:", error);
    }
  };
  return <button>Reset Grid</button>;
}

export default ResetButton;
