import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Sandbox from "./pages/Sandbox";
import Levels from "./pages/Levels";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Stats from "./components/Stats";
import SpellInfo from "./components/SpellInfoModal";
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
import { Toaster } from "react-hot-toast";
import { LoadModal } from "./components/LoadModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [anyModalOpened, setAnyModalOpened] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isSpellsOpen, setIsSpellsOpen] = useState(false);
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [renderContent, setRenderContent] = useState(false);
  const [easeIn, setEaseIn] = useState(false);
  const [isRunning, setIsRunning] = useState(false); // Speichert, ob der Vorgang läuft
  const [experience, setExperience] = useState(0); // Aktuelle Exp
  const [level, setLevel] = useState(1); // Aktuelles Level
  const maxLevel = 8; // Maximal erreichbares Level
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);

  // Exp-Anforderungen für jedes Level
  const expRequirements = [0, 100, 200, 350, 500, 700, 1000, 1500];

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
    if (level >= maxLevel) return; // Max. Level erreicht, keine weitere Erhöhung

    const expToLevelUp = expRequirements[level]; // Exp-Anforderung des aktuellen Levels

    if (experience >= expToLevelUp) {
      const leftoverExp = experience - expToLevelUp; // Rest-Exp ins nächste Level übertragen
      setLevel((prevLevel) => Math.min(prevLevel + 1, maxLevel)); // Level erhöhen
      setExperience(leftoverExp); // Restliche Exp behalten
    } else {
      setExperience(experience); // Exp erhöhen, Level bleibt gleich
    }
  }, [experience, level]);

  useEffect(() => {
    setAnyModalOpened(isModalOpen || isSaveModalOpen);
  }, [isModalOpen, isSaveModalOpen]);

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
      setExperience((prevCount) => prevCount + 5);
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
      <Toaster
        toastOptions={{
          duration: 3000,
          position: "bottom-left",
        }}
      />
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
            setIsSpellsOpen(false);
          }}
          onOpenSpells={() => {
            setIsStatsOpen(false);
            setIsSpellsOpen(!isSpellsOpen);
          }}
          setIsLoadModalOpen={setIsLoadModalOpen}
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
      {isSpellsOpen &&
        (location.pathname === "/sandbox" ? (
          <SpellInfo level={level} show={true} />
        ) : (
          <SpellInfo show={false} />
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
                  anyModalOpened={anyModalOpened}
                  onOpenSaveModal={() => {
                    setIsSaveModalOpen(true);
                  }}
                  isRunning={isRunning}
                  setIsRunning={setIsRunning}
                  level={level}
                />
                {isSaveModalOpen && (
                  <SaveModal
                    socket={socket}
                    onClose={() => setIsSaveModalOpen(false)}
                    isRunning={isRunning}
                  />
                )}
                {isLoadModalOpen && (
                  <LoadModal
                    socket={socket}
                    onClose={() => setIsLoadModalOpen(false)}
                  />
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
      {renderContent && (
        <div className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-90 h-10 flex items-center px-4">
          {/* Container für Balken und Text */}
          <div className="flex-grow flex items-center space-x-4">
            {/* Fortschrittsbalken-Hintergrund */}
            <div className="relative w-full h-2 bg-gray-600 rounded-full">
              {/* Fortschrittsbalken-Füllung */}
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                style={{
                  width: `${level < maxLevel ? Math.min((100 * experience) / expRequirements[level], 100) : 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Level-Anzeige */}
          <div className="ml-4 flex flex-col items-end">
            <span className="text-white text-sm font-semibold">
              Level: {level}
            </span>
            <span className="text-white text-sm font-light">
              {level < maxLevel
              ? `Exp: ${experience.toFixed(0)}/${expRequirements[level]}`
              : "Maxed"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
