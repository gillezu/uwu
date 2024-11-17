import React, { useRef, useEffect } from "react";

const Grid = ({ grid, cellSize, cellAges, width, height, onCellClick }) => {
  const canvasRef = useRef(null);

  const drawGrid = (grid, cellAges, ctx) => {
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
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    drawGrid(grid, cellAges, ctx);
  }, [grid, cellAges, cellSize, width, height]);

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
