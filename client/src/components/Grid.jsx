import React from 'react'

const Grid = ({grid, height, width, stats}) => {
  return <div>
    {grid?.map((row) => (
        <tr>{row?.map((cell) => (
            <td>{cell}</td>
        ))}</tr>
    ))}
  </div>
}

export default Grid
