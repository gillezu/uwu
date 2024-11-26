import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";

const levels = [
  { id: 1, name: "Level 1", route: "/leveldir/level1", image: "/public/pictures/level1.jpeg" },
  { id: 2, name: "Level 2", route: "/leveldir/level2", image: "/public/pictures/level2.jpeg" },
  { id: 3, name: "Level 3", route: "/leveldir/level3", image: "/public/pictures/level3.jpeg" },
  { id: 4, name: "Level 4", route: "/leveldir/level4", image: "/public/pictures/level4.jpeg" },
  { id: 5, name: "Level 5", route: "/leveldir/level5", image: "/public/pictures/level5.jpeg" },
  { id: 6, name: "Level 6", route: "/leveldir/level6", image: "/public/pictures/level6.jpeg" },
  { id: 7, name: "Level 7", route: "/leveldir/level7", image: "/public/pictures/level7.jpeg" },
  { id: 8, name: "Level 8", route: "/leveldir/level8", image: "/public/pictures/level8.jpeg" },
];

function Levels() {
  const navigate = useNavigate();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [pulsingPosition, setPulsingPosition] = useState({ top: "50%", left: "50%" });

  // Update the pulsing glow position every few seconds
  useEffect(() => {
    const updatePulsingPosition = () => {
      const randomTop = `${Math.random() * 80}%`; // Random Top Position (0%-80%)
      const randomLeft = `${Math.random() * 80}%`; // Random Left Position (0%-80%)
      setPulsingPosition({ top: randomTop, left: randomLeft });
    };

    const interval = setInterval(updatePulsingPosition, 3000); // Update position every 3 seconds
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking for parallax effects
  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <div
      className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-auto relative"
      onMouseMove={handleMouseMove}
    >
      {/* Top Gradient for Navbar transition */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-transparent via-gray-900 to-transparent z-20 pointer-events-none"></div>

      {/* Random Pulsing Glow */}
      <div
        className="absolute w-72 h-72 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-30 blur-2xl animate-ping"
        style={{
          top: pulsingPosition.top,
          left: pulsingPosition.left,
          transition: "top 1s ease, left 1s ease",
        }}
      ></div>

      {/* Header */}
      <div className="text-center py-16 z-10 relative">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          Choose Your Level
        </h1>
      </div>

      {/* Level Cards */}
      <div className="relative pt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-8 z-20 pb-32 ">
        {levels.map((level, index) => (
          <motion.div
            key={level.id}
            className="group relative h-72 rounded-3xl overflow-hidden shadow-lg cursor-pointer"
            onClick={() => navigate(level.route)}
            whileHover={{ scale: 1.05 }}
            style={{
              y: useTransform(mouseY, [0, window.innerHeight], [index % 2 === 0 ? -50 : 50, 0]),
            }}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{
                backgroundImage: `url(${level.image})`,
              }}
            ></div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>
            <h2 className="absolute bottom-4 left-4 text-3xl font-bold text-white z-10">
              {level.name}
            </h2>
          </motion.div>
        ))}
      </div>

      {/* Persistent Pulsing Glow at the Bottom */}
      <motion.div
        className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full opacity-30 blur-2xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      />
    </div>
  );
}

export default Levels;
