import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home({ easeIn, setEaseIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setEaseIn(true);
    }, 100);

    return () => clearTimeout(timeOut);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] 
        flex flex-col justify-center items-center text-center transition-all duration-[1500ms] ease-in 
        ${easeIn ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
      >
        <h1
          className="text-8xl font-extrabold text-transparent bg-gradient-to-r 
          from-cyan-500 via-indigo-500 to-pink-500 bg-clip-text animate-pulse"
        >
          Welcome to the Game of Life
        </h1>
        <p className="text-xl text-gray-300 mt-4 text-center">
          Explore the patterns of life, create your own, or take on challenging
          levels!
        </p>
        <div className="flex justify-evenly w-full mt-8">
          <button
            className="h-full px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-red-500 
            text-white font-semibold text-lg shadow-lg hover:scale-105 transform transition"
            onClick={() => navigate("/sandbox")}
          >
            Sandbox Mode
          </button>
          <button
            className="h-full px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-green-500 
            text-white font-semibold text-lg shadow-lg hover:scale-105 transform transition"
            onClick={() => navigate("/levels")}
          >
            Levels Mode
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
