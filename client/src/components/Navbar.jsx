import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { navLists } from "../constants";
import "../styles/components/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePollVertical,
  faMagnifyingGlass,
  faBars,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({
  socket,
  onOpenModal,
  onOpenStats,
  onOpenSpells,
  setIsLoadModalOpen,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const navItems = [
    { id: 1, text: "Home", route: "/" },
    { id: 2, text: "Sandbox", route: "/sandbox" },
    { id: 3, text: "Levels", route: "/levels" },
  ];

  const loadPatterns = () => {
    socket.emit("sendPatterns");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleNavigation = (mode, route) => {
    console.log(`Selected mode: ${mode}`);
    // Hier kannst du die gewünschte Logik einfügen, um den Modus zu ändern
    setDropdownOpen(false); // Dropdown schließen
    navigate(route);
  };

  return (
    <header className="w-full py-4 px-6 shadow-lg">
      <nav className="flex items-center justify-between">
        <h1
          className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-blue-500 via-purple-500 
          to-red-500 bg-clip-text cursor-pointer"
          onClick={toggleDropdown}
        >
          Game of Life
        </h1>
        <div className="hidden sm:flex flex-1 justify-center">
          {navLists.map((nav) => (
            <div
              key={nav}
              className="px-4 text-sm cursor-pointer text-gray underline_custom hover:text-white transition-all"
              onClick={() => {
                if (nav === "Library") {
                  loadPatterns();
                  onOpenModal();
                } else if (nav === "Load Pattern") {
                  setIsLoadModalOpen(true);
                }
              }}
            >
              {nav}
            </div>
          ))}
        </div>

        <div
          className="flex items-baseline space-x-4 max-sm:justify-end max-sm:flex-1"
          style={{ zIndex: 1 }}
        >
          <FontAwesomeIcon
            icon={faSquarePollVertical}
            size="xl"
            className="cursor-pointer hover:text-white transition-all"
            onClick={() => {
              onOpenStats();
            }}
          />
          <FontAwesomeIcon
            icon={faBook}
            size="xl"
            className="cursor-pointer hover:text-white transition-all"
            onClick={() => {
              onOpenSpells();
            }}
          />
        </div>
      </nav>
      {/* Mobile Navigation Menu */}
      <ul
        className={
          dropdownOpen
            ? "fixed left-0 top-0 w-[30%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 z-50"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        {/* Mobile Logo */}
        <h1
          className="text-3xl text-transparent bg-gradient-to-r from-blue-500 
            via-purple-500 to-red-500 bg-clip-text move-gradient-text game-header font-bold m-4 cursor-pointer"
          onClick={toggleDropdown}
        >
          Game of Life
        </h1>
        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 border-b rounded-xl hover:bg-[#690632] hover:duration-300 hover:bg-gradient-to-r from-blue-500 
            via-purple-500 to-red-500 hover:text-black hover:font-bold cursor-pointer border-gray-600"
            onClick={() => handleNavigation(item.text, item.route)}
          >
            {item.text}
          </li>
        ))}
      </ul>
      {/*
        <div
          className={`absolute top-[70px] right-4 bg-white shadow-lg rounded-lg p-4 w-64 border border-gray-200 transform transition-transform duration-300 ${
            dropdownOpen
              ? "opacity-100 -translate-x-100"
              : "opacity-0 translate-x-40 pointer-events-none"
          }`}
          style={{ zIndex: 1 }}
        >
          <div
            className="cursor-pointer py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded px-2 transition-all"
            onClick={() => handleModeSelection("Sandbox")}
          >
            Sandbox
          </div>
          <div
            className="cursor-pointer py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded px-2 transition-all"
            onClick={() => handleModeSelection("Level")}
          >
            Level
          </div>
        </div>*/}
    </header>
  );
};

export default Navbar;
