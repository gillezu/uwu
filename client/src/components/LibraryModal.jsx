import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faClose,
  faMagnifyingGlass,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function LibraryModal({ socket, onClose, patterns, resetGeneration }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const sandBox = location.pathname === "/sandbox";

  const onPatternClick = (code) => {
    socket.emit("applyPattern", { code });
    resetGeneration();
    toast.success("Pattern applied successfully");
    onClose();
  };

  const handleSwitchMode = () => {
    navigate("/sandbox");
    onClose();
  };

  const deletePattern = (name) => {
    socket.emit("deletePattern", { name });
    socket.emit("sendPatterns");
    toast.success("Pattern deleted successfully");
  };

  const filteredPatterns = Object.entries(patterns).filter(([name]) =>
    name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br bg-opacity-90 
      flex items-center justify-center z-50 backdrop-blur-md animate-fadeIn"
    >
      <div
        className="bg-gradient-to-br from-purple-700 via-black to-gray-900 w-[90vw] max-w-5xl h-[70vh] rounded-xl 
        shadow-2xl border border-opacity-30 border-white p-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          {/* Search */}
          <div className="flex items-center w-1/3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 focus:outline-none bg-black bg-opacity-10 hover:bg-opacity-20 hover:scale-105 text-white transition-transform duration-300"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
            </button>
            <input
              type="text"
              placeholder="Search patterns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`ml-3 text-white bg-gray-800 px-4 py-2 rounded-lg border border-gray-600 focus:outline-none 
              focus:ring-2 focus:ring-green-500 transition-all duration-300 ${
                isOpen ? "w-full opacity-100" : "w-0 opacity-0"
              }`}
            />
          </div>

          {/* Title */}
          <div className="text-center w-1/3">
            <h1
              className="text-4xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r 
              from-green-400 to-blue-500 flex justify-center items-center"
            >
              <FontAwesomeIcon icon={faBook} className="mr-2" />
              Library
              <FontAwesomeIcon icon={faBook} className="ml-2" />
            </h1>
          </div>

          {/* Close Button */}
          <div className="flex justify-end w-1/3">
            <button
              className="text-white text-lg bg-white bg-opacity-10 hover:bg-opacity-20 p-2 rounded-full transition duration-300"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faClose} size="lg" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        {sandBox ? (
          <div className="overflow-auto h-[calc(100%-80px)] p-4 text-white">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr>
                  <th className="border-b border-gray-700 py-2">
                    Pattern Name
                  </th>
                  <th className="border-b border-gray-700 py-2">Code</th>
                  <th className="border-b border-gray-700 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatterns.length > 0 ? (
                  filteredPatterns.map(([name, code], index) => (
                    <tr
                      key={index}
                      className="cursor-pointer hover:bg-gray-700 transition-all duration-300"
                      onClick={() => onPatternClick(code)}
                    >
                      <td className="py-2 border-b border-gray-700">{name}</td>
                      <td className="py-2 border-b border-gray-700 font-mono">
                        {code.length > 10 ? `${code.slice(0, 10)}...` : code}
                      </td>
                      <td className="py-2 border-b border-gray-700 text-center">
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded transition-all duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            deletePattern(name);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} size="lg" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center text-gray-400 py-6">
                      No patterns match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-white text-3xl mb-6 text-center">
              Patterns are not available in this mode. <br />
              Switch to Sandbox mode to view and apply patterns.
            </h1>
            <button
              onClick={handleSwitchMode}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-red-500 
              text-white font-semibold text-lg shadow-lg hover:scale-105 transform transition-transform duration-300"
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
