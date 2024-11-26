import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Sandbox from "./pages/Sandbox";
import Levels from "./pages/Levels";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Stats from "./components/Stats";
import LibraryModal from "./components/LibraryModal";
import { socket } from "./utils/socketioSetup";
import "./styles/animations/rotate.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [renderContent, setRenderContent] = useState(false);
  const [easeIn, setEaseIn] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const curtainTimeout = setTimeout(() => {
      setCurtainOpen(true);
    }, 1200);

    const renderTimeout = setTimeout(() => {
      setRenderContent(true);
    }, 920);
    return () => {
      clearTimeout(curtainTimeout);
      clearTimeout(renderTimeout);
      setCurtainOpen(false);
      setRenderContent(false);
    };
  }, [location]);

  return (
    <div
      className="relative flex flex-col items-center justify-start h-screen w-screen 
      bg-cover bg-center bg-[url('./assets/polygonScatterBG.svg')]"
      /*style={{ animation: "rotate-background 10s infinite linear" }}***/ //
    >
      <div
        className={` z-50 absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-blue-500 
          via-purple-500 to-red-500  transition-transform duration-1000 ${
            curtainOpen ? "-translate-x-full" : "translate-x-0"
          }`}
      ></div>
      <div
        className={`z-50 absolute top-0 right-0 h-full w-1/2 bg-gradient-to-r from-red-500 
          via-purple-500 to-blue-500  transition-transform duration-1000 ${
            curtainOpen ? "translate-x-full" : "translate-x-0"
          }`}
      ></div>
      {renderContent && (
        <Navbar
          socket={socket}
          onOpenModal={() => {
            setIsModalOpen(true);
          }}
          onOpenStats={() => {
            setIsStatsOpen(!isStatsOpen);
          }}
        />
      )}
      {isModalOpen && (
        <LibraryModal
          socket={socket}
          patterns={patterns}
          resetGeneration={resetGeneration}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isStatsOpen && <Stats stats={data.stats} />}
      {renderContent && (
        <Routes>
          <Route
            path="/"
            element={<Home easeIn={easeIn} setEaseIn={setEaseIn} />}
          />
          <Route path="/sandbox" element={<Sandbox />} />
          <Route path="/levels" element={<Levels />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
