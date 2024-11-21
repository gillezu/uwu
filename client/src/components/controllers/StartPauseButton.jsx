import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";

const StartPauseButton = ({ socket, FPS }) => {
  const [isRunning, setIsRunning] = useState(false); // Speichert, ob der Vorgang läuft
  const [intervalId, setIntervalId] = useState(null); // Speichert die Intervall-ID

  const startProcess = () => {
    const id = setInterval(() => {
      socket.emit("nextGeneration");
    }, 1000 / FPS);
    setIntervalId(id);
  };

  const stopProcess = () => {
    clearInterval(intervalId); // Stoppe den laufenden Intervall
    setIntervalId(null);
  };

  const toggleProcess = () => {
    if (isRunning) {
      stopProcess(); // Stoppt den Prozess
    } else {
      startProcess(); // Startet den Prozess
    }
    setIsRunning(!isRunning); // Ändert den Button-Zustand
  };

  // Säubere das Intervall, wenn die Komponente unmountet
  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <button
      onClick={toggleProcess}
      className="w-[30%] hover:bg-transparent hover:border-white border-2 transition-all duration-500"
    >
      {isRunning ? (
        <FontAwesomeIcon icon={faStop} />
      ) : (
        <FontAwesomeIcon icon={faPlay} />
      )}
    </button>
  );
};

export default StartPauseButton;
