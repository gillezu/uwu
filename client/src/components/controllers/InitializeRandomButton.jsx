import axios from "axios";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";

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
  return (
    <button onClick={initializeRandom} className="w-[30%]">
      <FontAwesomeIcon icon={faShuffle} />
    </button>
  );
}

export default InitializeRandomButton;
