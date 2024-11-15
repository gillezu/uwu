import React from "react";
import Cell from "./Cell";

const Grid = ({ grid, height, width, stats, cellSize }) => {
  return (
    <table>
      <tbody>
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
      </tbody>
    </table>
  );
};

export default Grid;
