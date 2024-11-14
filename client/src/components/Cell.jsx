import React, { useState, useEffect } from "react";

const Cell = ({ width, height, age, isAlive }) => {
  const getColor = (age) => {
    if (!isAlive) return "#fff";
    const greenIntensity = Math.min(255, age * 15);
    return `rgb(0, ${greenIntensity}, 0)`;
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
