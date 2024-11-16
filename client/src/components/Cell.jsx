import React, { useState, useEffect } from "react";

const Cell = ({ width, height, age, isAlive }) => {
  const getColor = (age) => {
    if (!isAlive) {
      const grayValue = Math.max(255 - age, 0);
      return `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
    }
    
    const red = Math.max(255 - 2 * age, 0);
    const green = Math.min(age, 255);
    const blue = Math.max(255 - 0.5 * age, 0);
    
    return `rgb(${red}, ${green}, ${blue})`;
  };

  return (
    <>
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: `${getColor(age)}`,
          transition: "background-color 0.5s ease",
        }}
      ></div>
    </>
  );
};

export default Cell;
