import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";

function InitializeRandomButton({ socket, onUpdateGrid }) {
  const initializeRandom = () => {
    socket.emit("initialize_random", null, (response) => {
      if (response) {
        onUpdateGrid(response);
      }
    });
  };
  return (
    <button onClick={initializeRandom} className="w-[30%]">
      <FontAwesomeIcon icon={faShuffle} />
    </button>
  );
}

export default InitializeRandomButton;
