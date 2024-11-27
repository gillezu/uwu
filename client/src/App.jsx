import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Sandbox from "./pages/Sandbox";
import Levels from "./pages/Levels";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Stats from "./components/Stats";
import Level1 from "./pages/leveldir/level1";
import Level2 from "./pages/leveldir/level2";
import Level3 from "./pages/leveldir/level3";
import Level4 from "./pages/leveldir/level4";
import Level5 from "./pages/leveldir/level5";
import Level6 from "./pages/leveldir/level6";
import Level7 from "./pages/leveldir/level7";
import Level8 from "./pages/leveldir/level8";
import LibraryModal from "./components/LibraryModal";
import SaveModal from "./components/SaveModal";
import { socket } from "./utils/socketioSetup";
import "./styles/animations/rotate.css";
import axios from "axios";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [renderContent, setRenderContent] = useState(false);
  const [easeIn, setEaseIn] = useState(false);

  const [data, setData] = useState({
    cell_age: [[]],
    cell_size: 5,
    cells: [[]],
    height: 10,
    width: 10,
  });

  const [loading, setLoading] = useState(true);
  const [generation, setGeneration] = useState(0);

  const [patterns, setPatterns] = useState({});

  const resetGeneration = () => setGeneration(-1);

  const [fps, setFPS] = useState(17);

  const [headerZoom, setHeaderZoom] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHeaderZoom(true);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  const handleFPSChange = (event) => {
    const newFPS = event.target.value;
    setFPS(newFPS);
  };

  useEffect(() => {
    socket.on("getPatterns", (response) => {
      setPatterns(response);
    });
  }, []);

  useEffect(() => {
    socket.on("getGrid", (response) => {
      setData(response);
      setGeneration((prevCount) => prevCount + 0.5); // Keine Ahnung warum 0.5, Funktion wird anscheinend 2x ausgeführt
    });
  }, []);

  useEffect(() => {
    const fetchInitialGrid = async () => {
      try {
        const response = await axios.get("/initialize_grid");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInitialGrid();
  }, []);

  useEffect(() => {}, [data]);

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
      {isStatsOpen &&
        (location.pathname === "/sandbox" ? (
          <Stats stats={data.stats} />
        ) : (
          <Stats />
        ))}
      {renderContent && (
        <Routes>
          <Route
            path="/"
            element={<Home easeIn={easeIn} setEaseIn={setEaseIn} />}
          />
          <Route
            path="/sandbox"
            element={
              <>
                <Sandbox
                  onOpenSaveModal={() => {
                    setIsSaveModalOpen(true);
                  }}
                />
                {isSaveModalOpen && (
                  <SaveModal onClose={() => setIsSaveModalOpen(false)} />
                )}
              </>
            }
          />
          <Route path="/levels" element={<Levels />} />
          <Route path="/levels/level1" element={<Level1 />} />
          <Route path="/levels/level2" element={<Level2 />} />
          <Route path="/levels/level3" element={<Level3 />} />
          <Route path="/levels/level4" element={<Level4 />} />
          <Route path="/levels/level5" element={<Level5 />} />
          <Route path="/levels/level6" element={<Level6 />} />
          <Route path="/levels/level7" element={<Level7 />} />
          <Route path="/levels/level8" element={<Level8 />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
