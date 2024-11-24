import React from 'react'

const Stats = ({ stats }) => {
    return (
      <div
        className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 w-64 border border-gray-200"
      >
        <h1 className="text-lg font-semibold text-gray-800">Statistics</h1>
        <hr className="my-2 border-gray-300" />
        <p className="text-sm text-gray-600">
          <span className="font-bold">Cells alive:</span> {stats[0]}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-bold">Cells dead:</span> {stats[1]}
        </p>
      </div>
    );
  };

export default Stats
