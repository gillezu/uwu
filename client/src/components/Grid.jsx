import React from 'react'

const Grid = ({grid, height, width, stats}) => {
  return <div>
    {grid?.map((row, i) => (
        <tr key={i}>{row?.map((cell, j) => (
            <td key={j}>{cell}</td>
        ))}</tr>
    ))}
  </div>
}

export default Grid
