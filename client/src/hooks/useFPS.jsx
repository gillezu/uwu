import React, { useState, useEffect } from "react";

const useFPS = (frameCount) => {
  const [fps, setFps] = useState(0);

  useEffect(() => {
    let lastTime = performance.now();
    let lastFrameCount = frameCount;

    const calculateFps = () => {
      const now = performance.now();
      const deltaTime = now - lastTime;

      if (deltaTime >= 1000) { // Alle 1 Sekunde aktualisieren
        const frameDifference = frameCount - lastFrameCount;
        setFps(frameDifference);

        lastFrameCount = frameCount;
        lastTime = now;
      }

      requestAnimationFrame(calculateFps); // Wiederhole die Berechnung
    };

    calculateFps(); // Starte die Berechnung beim ersten Mount

    return () => {}; // Keine spezielle Aufräumaktion nötig
  }, [frameCount]); // Führe die Berechnung aus, wenn sich frameCount ändert

  return fps;
};

export default useFPS;
