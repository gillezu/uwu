import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";

function ResetButton({ socket, onUpdateGrid, resetGeneration }) {
  const resetGrid = () => {
    socket.emit("reset_grid", null, (response) => {
      if (response) {
        onUpdateGrid(response);
        resetGeneration();
      }
    });
  };
  return (
    <button onClick={resetGrid} className="w-[30%]">
      <FontAwesomeIcon icon={faRefresh} />
    </button>
  );
}

export default ResetButton;
