import React from "react";
import { useNavigate } from "react-router-dom";

function Level1() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center text-white">
      {/* Header */}
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 animate-pulse">
        Level 1: Starting the Journey
      </h1>

      {/* Description */}
      <p className="text-lg mt-4 text-gray-300 max-w-2xl text-center">
        Welcome to Level 1! Your goal is to explore the basic mechanics of the Game of Life. 
        Try to create patterns and see how they evolve. Can you discover something unique?
      </p>

      {/* Game Area Placeholder */}
      <div
        className="mt-8 w-3/4 h-[400px] bg-gray-900 border border-gray-700 rounded-lg shadow-inner 
        flex items-center justify-center text-gray-400 text-lg"
      >
        Game Area - Coming Soon!
      </div>

      {/* Buttons */}
      <div className="flex space-x-6 mt-10">
        <button
          className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-red-500 
          text-white font-semibold text-lg shadow-lg hover:scale-105 transform transition"
          onClick={() => navigate("/levels")}
        >
          Back to Levels
        </button>
        <button
          className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-green-500 
          text-white font-semibold text-lg shadow-lg hover:scale-105 transform transition"
          onClick={() => alert("Game logic will go here!")}
        >
          Start Level
        </button>
      </div>
    </div>
  );
}

export default Level1;
