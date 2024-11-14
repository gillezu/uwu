import React from "react";
import Cell from "./Cell";

const Grid = ({ grid, height, width, stats, cellSize }) => {
  return (
    <div>
      {grid?.map((row, i) => (
        <tr key={i}>
          {row?.map((cell, j) => (
            <td key={j}>
              {
                <Cell
                  width={cellSize}
                  height={cellSize}
                  isAlive={cell}
                  age={cell * 255}
                />
              }
            </td>
          ))}
        </tr>
      ))}
    </div>
  );
};

export default Grid;
