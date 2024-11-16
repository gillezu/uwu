import React from "react";
import Cell from "./Cell";
import axios from "axios";

const Grid = ({ grid, height, width, stats, cellSize, cellAge, onUpdateGrid }) => {
  const handleMouseDown = async (i, j, event) => {
    const coords = { i, j, x: event.clientX, y: event.clientY };
    try {
      const response = await axios.post("/mouse-coords", coords);
      console.log("Server response:", response.data);

      // Aktualisiere das Gitter im Parent-Component (App)
      onUpdateGrid(response.data); // Übergibt den neuen Gitterzustand an die App-Komponente
    } catch (error) {
      console.error("Error posting data:", error);
    }
    console.log(coords);
  };

  return (
    <table>
      <tbody>
        {grid?.map((row, i) => (
          <tr key={i}>
            {row?.map((cell, j) => (
              <td key={j} onMouseDown={(event) => handleMouseDown(i, j, event)}>
                {
                  <Cell
                    width={cellSize}
                    height={cellSize}
                    isAlive={cell}
                    age={cellAge[i][j]}
                  />
                }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Grid;

