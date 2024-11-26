import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faClose,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";

function LibraryModal({ socket, onClose, patterns, resetGeneration }) {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const sandBox = location.pathname === "/sandbox";

  const onPatternClick = (code) => {
    socket.emit("applyPattern", { code });
    resetGeneration();
    onClose();
  };

  const handleSwitchMode = () => {
    navigate("/sandbox");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur">
      <div className="bg-black w-[50vw] h-[70vh] rounded shadow-lg flex flex-col border-2 border-white">
        <div className="flex justify-between items-start p-5 border-b border-white">
          <div className="w-1/3 flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 focus:outline-none hover:scale-105"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
            </button>
            <input
              type="text"
              placeholder="Search"
              className={`transition-all duration-300 ease-in-out text-white ${
                isOpen ? "w-full ml-3 opacity-100" : "w-0 ml-0 opacity-0"
              } px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div className="w-1/3 flex justify-center items-center">
            <FontAwesomeIcon icon={faBook} size="3x" />
            <h1 className="text-5xl mx-5 text-white">Library</h1>
            <FontAwesomeIcon icon={faBook} size="3x" />
          </div>
          <div className="w-1/3 flex justify-end">
            <button
              className="px-4 py-2 rounded text-white bg-transparent border-2 hover:border-white
              transition-colors duration-500 ease-in-out"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faClose} size="2x" />
            </button>
          </div>
        </div>
        {sandBox ? (
          <div className="overflow-auto p-4">
            <table className="w-full text-white border-collapse">
              <thead>
                <tr>
                  <th className="border-b-2 border-gray-700 py-2 text-left">
                    Pattern Name
                  </th>
                  <th className="border-b-2 border-gray-700 py-2 text-left">
                    Pattern Code
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(patterns).map(([name, code], index) => (
                  <tr
                    className="py-2 border-b border-gray-700 cursor-pointer hover:bg-gray-700 hover:text-white transition-colors duration-300"
                    key={index}
                    onClick={() => onPatternClick(code)}
                  >
                    <td className="py-2 border-b border-gray-700">{name}</td>
                    <td className="py-2 border-b border-gray-700 font-mono">
                      {code.length > 10 ? `${code.slice(0, 10)}...` : code}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="h-[80%] flex flex-col items-center justify-center">
            <h1 className="text-white text-4xl mb-10 text-center">
              No patterns available in this mode. <br />
              Switch to Sandbox mode to use patterns.
            </h1>
            <button
              className="px-16 py-5 rounded-full bg-gradient-to-r from-purple-600 to-red-500 
            text-white font-semibold text-lg shadow-lg hover:scale-105 transform transition"
              onClick={handleSwitchMode}
            >
              Switch to Sandbox
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LibraryModal;
