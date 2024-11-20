import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";

function ResetButton({ socket, resetGeneration }) {
  const resetGrid = () => {
    socket.emit("resetGrid");
    resetGeneration();
  };
  
  return (
    <button onClick={resetGrid} className="w-[30%]">
      <FontAwesomeIcon icon={faRefresh} />
    </button>
  );
}

export default ResetButton;
