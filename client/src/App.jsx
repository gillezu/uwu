import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Sandbox from "./pages/Sandbox";
import Levels from "./pages/Levels";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sandbox" element={<Sandbox />} />
      <Route path="/levels" element={<Levels />} />
    </Routes>
  );
}

export default App;
