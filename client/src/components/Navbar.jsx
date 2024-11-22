import React, { useState, useEffect } from "react";
import { navLists } from "../constants";
import "../styles/components/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePollVertical,
  faMagnifyingGlass,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ socket, onOpenModal, onOpenStats }) => {
  const [patterns, setPatterns] = useState({});

  useEffect(() => {
    socket.on("getPatterns", (response) => {
      setPatterns(response)
    });
  }, []);

  const loadPatterns = () => {
    console.log("hey")
    socket.emit("sendPatterns");
  }
  

  return (
    <header className="w-full py-4 px-6 shadow-lg">
      <nav className="flex items-center justify-between">
        <FontAwesomeIcon
          icon={faSquarePollVertical}
          size="xl cursor-pointer hover:text-white transition-all"
          onClick={() => {
              onOpenStats();
          }}
        />
        <div className="hidden sm:flex flex-1 justify-center">
          {navLists.map((nav) => (
            <div
              key={nav}
              className="px-4 text-sm cursor-pointer text-gray underline_custom hover:text-white transition-all"
              onClick={() => {
                if (nav === "Library") {
                  loadPatterns();
                  onOpenModal();
                }
              }}
            >
              {nav}
            </div>
          ))}
        </div>

        <div className="flex items-baseline space-x-4 max-sm:justify-end max-sm:flex-1">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size="xl cursor-pointer hover:text-white transition-all"
          />
          <FontAwesomeIcon
            icon={faBars}
            size="xl cursor-pointer hover:text-white transition-all"
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
