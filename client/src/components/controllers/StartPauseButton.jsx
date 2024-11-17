import React, { useState, useEffect } from "react";
import axios from "axios";

const StartPauseButton = ({ onUpdateGrid, FPS }) => {
  const [isRunning, setIsRunning] = useState(false); // Speichert, ob der Vorgang läuft
  const [intervalId, setIntervalId] = useState(null); // Speichert die Intervall-ID

  const startProcess = () => {
    const id = setInterval(async () => {
      try {
        // Hole die nächste Generation mit Axios vom Server
        const response = await axios.get("/nextGeneration");
        console.log("Grid updated:", response.data);
        onUpdateGrid(response.data); // Aktualisiere das Grid im Frontend
      } catch (error) {
        console.error("Error fetching next generation:", error);
      }
    }, 1000 / FPS); // Führt die Funktion alle 500ms aus
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
    <button onClick={toggleProcess} className="w-[30%]">
      {isRunning ? "Stop" : "Start"}
    </button>
  );
};

export default StartPauseButton;
