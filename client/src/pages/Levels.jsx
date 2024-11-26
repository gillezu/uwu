import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const levels = [
  { id: 1, name: "Level 1", route: "/leveldir/level1" },
  { id: 2, name: "Level 2", route: "/leveldir/level2" },
  { id: 3, name: "Level 3", route: "/leveldir/level3" },
  { id: 4, name: "Level 4", route: "/leveldir/level4" },
  { id: 5, name: "Level 5", route: "/leveldir/level5" },
  { id: 6, name: "Level 6", route: "/leveldir/level6" },
  { id: 7, name: "Level 7", route: "/leveldir/level7" },
  { id: 8, name: "Level 8", route: "/leveldir/level8" },
];

function Levels() {
  const navigate = useNavigate();
  const [pulsingPosition, setPulsingPosition] = useState({ top: "10%", left: "10%" });

  useEffect(() => {
    const updatePulsingPosition = () => {
      const randomTop = `${Math.random() * 80}%`; // Random Top Position (0%-80%)
      const randomLeft = `${Math.random() * 80}%`; // Random Left Position (0%-80%)
      setPulsingPosition({ top: randomTop, left: randomLeft });
    };

    const interval = setInterval(updatePulsingPosition, 3000); // Update position every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-transparent via-gray-900 to-transparent">
      <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative">
        {/* Top-Gradient für sanften Übergang */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-transparent via-gray-900 to-transparent z-20 pointer-events-none"></div>

        {/* Dynamischer Puls-Effekt */}
        <div
          className="absolute w-72 h-72 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-30 blur-2xl animate-ping"
          style={{
            top: pulsingPosition.top,
            left: pulsingPosition.left,
            transition: "top 1s ease, left 1s ease",
          }}
        ></div>

        {/* Überschrift */}
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mt-16 z-10">
          Choose Your Level
        </h1>

        {/* Levelauswahl */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 w-4/5 z-10">
          {levels.map((level) => (
            <div
              key={level.id}
              className="relative flex flex-col items-center justify-center p-6 rounded-3xl bg-gray-900 bg-opacity-80
              hover:bg-gradient-to-br hover:from-purple-600 hover:to-red-500 hover:scale-105 hover:shadow-2xl
              transition-transform duration-500 cursor-pointer"
              onClick={() => navigate(level.route)}
            >
              {/* Glowing Border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-500 blur-lg opacity-20"></div>

              {/* Text-Inhalt */}
              <h2 className="relative text-3xl font-bold tracking-wider">{level.name}</h2>
            </div>
          ))}
        </div>

        {/* Animierter Hintergrundeffekt */}
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-green-400 to-blue-600 rounded-full opacity-20 blur-2xl animate-pulse"></div>
      </div>
    </div>
  );
}

export default Levels;
