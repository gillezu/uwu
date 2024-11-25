import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
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
    <div
      className={`w-[80vw] h-[60vh] flex flex-col justify-around items-center
      transition-all duration-[1500ms] ease-in ${easeIn ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
    >
      <div>
        <h1
          className="text-7xl text-transparent bg-gradient-to-r from-blue-500 
          via-purple-500 to-red-500 bg-clip-text move-gradient-text "
        >
          Welcom to the Game of Life
        </h1>
      </div>
      <div className="flex justify-around w-[80%]">
        <button onClick={() => navigate("/sandbox")}>Sandbox</button>
        <button onClick={() => navigate("/levels")}>Levels</button>
      </div>
    </div>
  );
}

export default Home;
