import React from "react";

const Stats = ({ stats }) => {
  return (
    <div
      className="absolute top-16 right-4 bg-gradient-to-br from-blue-500 via-purple-500 to-red-500 shadow-2xl rounded-xl p-6 w-80 border border-opacity-30 border-white text-white 
      animate-fadeIn backdrop-blur-lg backdrop-saturate-150"
    >
      <h1 className="text-2xl font-extrabold tracking-wide text-white mb-4 drop-shadow-md">
        📊 Statistics
      </h1>
      <hr className="my-2 border-opacity-50" />
      {Array.isArray(stats) && stats.length >= 2 ? (
        <>
          <div className="flex justify-between items-center text-lg my-3">
            <span className="font-semibold drop-shadow-md">Cells alive:</span>
            <span className="font-bold text-emerald-300">{stats[0]}</span>
          </div>
          <div className="flex justify-between items-center text-lg my-3">
            <span className="font-semibold drop-shadow-md">Cells dead:</span>
            <span className="font-bold text-red-300">{stats[1]}</span>
          </div>
          <div className="flex justify-between items-center text-lg my-3">
            <span className="font-semibold drop-shadow-md">Cells born:</span>
            <span className="font-bold text-red-300">{stats[2]}</span>
          </div>
          <div className="flex justify-between items-center text-lg my-3">
            <span className="font-semibold drop-shadow-md">Cells died:</span>
            <span className="font-bold text-red-300">{stats[3]}</span>
          </div>
          <div className="flex justify-between items-center text-lg my-3">
            <span className="font-semibold drop-shadow-md">Maximum lifespan:</span>
            <span className="font-bold text-red-300">{stats[4]}</span>
          </div>
          <div className="flex justify-between items-center text-lg my-3">
            <span className="font-semibold drop-shadow-md">Average Lifespan:</span>
            <span className="font-bold text-red-300">{stats[5].toFixed(3)}</span>
          </div>
        </>
      ) : (
        <p className="text-lg italic text-gray-200 mt-4">
          No statistics available in this mode.
        </p>
      )}
      <div className="mt-4 text-center text-sm font-light opacity-75">
        Game of Life - Powered by Gioele & Richard
      </div>
    </div>
  );
};

export default Stats;
