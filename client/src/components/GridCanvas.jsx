import React, { useRef, useEffect, useState } from "react";
import SaveModal from "./SaveModal";

const Grid = ({ grid, cellSize, cellAges, width, height, cellfreezed, onCellClick, onKeyPress, anyModalOpened }) => {
  const [coords, setCoords] = useState({ x: 5, y: 5 });
  const coordsRef = useRef(coords)
  const canvasRef = useRef(null);

  useEffect(() => {
    coordsRef.current = coords;
  }, [coords]);

  const drawGrid = (grid, cellAges, ctx) => {
    if (!grid || !cellAges) {
      console.error("drawGrid wurde mit ungültigen Daten aufgerufen!");
      return;
    }


    ctx.clearRect(0, 0, width * cellSize, height * cellSize);

    /*if cell.state == CellState.ALIVE:
                    if not cell.freezed:
                        r = max(255 - 2*cell.time_not_changed, 0)
                        g = min(cell.time_not_changed, 255)
                        b = max(255 - 0.5*cell.time_not_changed, 0)
                        color = (r, g, b)
                    elif cell.freezed:
                        r = int(max(255 - 2*cell.time_not_changed, 0)*0.8)
                        g = int(min(cell.time_not_changed, 255)*0.9)
                        b = int(max(255 - 0.5*cell.time_not_changed, 0) + (255 - max(255 - 0.5*cell.time_not_changed, 0))*0.2)
                        color = (r, g, b)
                    self.stats[0] += 1
                    if cell.time_not_changed == 0:
                        self.stats[2] += 1
                else:
                    if not cell.freezed:
                        r, g, b = max(255 - cell.time_not_changed, 0), max(255 - cell.time_not_changed, 0), max(255 - cell.time_not_changed, 0)
                        color = (r, g, b)
                    elif cell.freezed:
                        r = int(max(255 - cell.time_not_changed, 0)*0.8)
                        g = int(max(255 - cell.time_not_changed, 0)*0.9)
                        b = int(max(255 - cell.time_not_changed, 0) + (255 - max(255 - cell.time_not_changed, 0))*0.2)
                        color = (r, g, b)
                    self.stats[1] += 1
                    if cell.time_not_changed == 0:
                        self.stats[3] += 1*/ 

    const getColor = (age, isAlive, freezed) => {
      if (isAlive) {
        if (!freezed) {
          const red = Math.max(255 - 2 * age, 0);
          const green = Math.min(age, 255);
          const blue = Math.max(255 - 0.5 * age, 0);
          return `rgb(${red}, ${green}, ${blue})`;
        } else {
          const red = Math.floor(Math.max(255 - 2 * age, 0) * 0.8);
          const green = Math.floor(Math.min(age, 255) * 0.9);
          const blue = Math.floor(
            Math.max(255 - 0.5 * age, 0) +
            (255 - Math.max(255 - 0.5 * age, 0)) * 0.2
          );
          return `rgb(${red}, ${green}, ${blue})`;
        }
      } else {
        if (!freezed) {
          const grayValue = Math.max(255 - age, 0);
          return `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
        } else {
          const grayValue = Math.max(255 - age, 0);
          const red = Math.floor(grayValue * 0.8);
          const green = Math.floor(grayValue * 0.9);
          const blue = Math.floor(
            grayValue + (255 - grayValue) * 0.2
          );
          return `rgb(${red}, ${green}, ${blue})`;
        }
      }
    };

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const isAlive = grid[i][j] === 1;
        const age = cellAges[i][j];
        const freezed = cellfreezed[i][j];
        cellfreezed
        ctx.fillStyle = getColor(age, isAlive, freezed);
        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
      }
    }
  };

  useEffect(() => {
    if (!grid || !cellAges) {
      console.warn("grid oder cellAges sind nicht definiert!");
      return;
    }

    if (grid && cellAges) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      drawGrid(grid, cellAges, ctx);
    }
  }, [grid, cellAges, cellSize, width, height]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCoords({ x: event.clientX, y: event.clientY });
    };
    const handleKeyDown = (event) => {
      console.log(anyModalOpened)
      if (!anyModalOpened) {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        // Koordinaten relativ zum Canvas berechnen
        const x = coordsRef.current.x - rect.left;
        const y = coordsRef.current.y - rect.top;
        const i = Math.floor(y / cellSize);
        const j = Math.floor(x / cellSize);
        switch (event.key) {
          case "l":
            onKeyPress(0, i, j);
            break;
          case "e":
            onKeyPress(1, i, j);
            break;
          case "f":
            onKeyPress(2, i, j);
            break;
          case "u":
            onKeyPress(3, i, j);
            break;
          case "r":
            onKeyPress(4, i, j);
            break;
          default:
            console.log(`Andere Taste: ${event.key}`);
        };
      };
    };

    // Event-Listener hinzufügen
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [cellSize, onCellClick]);

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
