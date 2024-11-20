import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";

function InitializeRandomButton({ socket, resetGeneration }) {
  const initializeRandom = () => {
    socket.emit("initializeRandom");
    resetGeneration();
  };

  return (
    <button onClick={initializeRandom} className="w-[30%]">
      <FontAwesomeIcon icon={faShuffle} />
    </button>
  );
}

export default InitializeRandomButton;
