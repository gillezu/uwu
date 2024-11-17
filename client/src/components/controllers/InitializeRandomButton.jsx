import axios from "axios";
import React from "react";

function InitializeRandomButton({ onUpdateGrid }) {
  const initializeRandom = async () => {
    try {
      const response = await axios.post("/initializeRandom");
      onUpdateGrid(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  return <button onClick={initializeRandom}>Initialize Random</button>;
}

export default InitializeRandomButton;
