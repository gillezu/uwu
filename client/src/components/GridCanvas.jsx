import React, { useRef, useEffect, useState } from "react";

const Grid = ({ grid, cellSize, cellAges, width, height, onCellClick, onKeyPress }) => {
  const canvasRef = useRef(null);
  const [coords, setCoords] = useState({ x: 5, y: 5 });

  const drawGrid = (grid, cellAges, ctx) => {
    if (!grid || !cellAges) {
      console.error("drawGrid wurde mit ungültigen Daten aufgerufen!");
      return;
    }


    ctx.clearRect(0, 0, width * cellSize, height * cellSize);

    const getColor = (age, isAlive) => {
      if (!isAlive) {
        const grayValue = Math.max(255 - age, 0);
        return `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
      }

      const red = Math.max(255 - 2 * age, 0);
      const green = Math.min(age, 255);
      const blue = Math.max(255 - 0.5 * age, 0);

      return `rgb(${red}, ${green}, ${blue})`;
    };

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const isAlive = grid[i][j] === 1;
        const age = cellAges[i][j];
        ctx.fillStyle = getColor(age, isAlive);
        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
      }
    }
  };

  useEffect(() => {
    if (!grid || !cellAges) {
      console.warn("grid oder cellAges sind nicht definiert!");
      return;
    }

    console.log("Aktueller Zustand von grid:", grid);
    console.log("Aktueller Zustand von cellAges:", cellAges);


    if (grid && cellAges) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      drawGrid(grid, cellAges, ctx);
    }
  }, [grid, cellAges, cellSize, width, height]);

  useEffect(() => {
    // Mausbewegung verfolgen
    const handleMouseMove = (event) => {
        setCoords({ x: event.clientX, y: event.clientY });
    };

    // Events hinzufügen
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("keydown", handleKeyDown);
    };
}, []);

  const handleKeyDown = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = coords.x - rect.left;
    const y = coords.y - rect.top;
    const i = Math.floor(y / cellSize);
    const j = Math.floor(x / cellSize);
    console.log(coords)
    switch (event.key) {
        case "ArrowUp":
            onCellClick(i, j);
            break;
        case "ArrowDown":
            console.log("Pfeil nach unten gedrückt!");
            break;
        case "ArrowLeft":
            console.log("Pfeil nach links gedrückt!");
            break;
        case "ArrowRight":
            console.log("Pfeil nach rechts gedrückt!");
            break;
        default:
            console.log(`Andere Taste: ${event.key}`);
    }
  }

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const i = Math.floor(y / cellSize);
    const j = Math.floor(x / cellSize);
    onCellClick(i, j);
  };

  return (
    <canvas
      ref={canvasRef}
      width={width * cellSize} // Setze die Breite des Canvas
      height={height * cellSize} // Setze die Höhe des Canvas
      onClick={handleCanvasClick}
      style={{ border: "1px solid black" }}
    />
  );
};

export default Grid;
