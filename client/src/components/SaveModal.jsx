import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSave } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";

function SaveModal({ onClose, socket, isRunning }) {
  const [patternName, setPatternName] = useState("");

  const savePattern = () => {
    socket.emit("addPattern", patternName);
    toast.success("Pattern saved successfully!");
  };

  // Event listener for "Enter" key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && patternName.trim() !== "") {
        savePattern();
        const timeOut = setTimeout(() => {
          onClose();
        }, 250);
      } else if (e.key === "Enter" && patternName.trim() === "") {
        toast.error("Please provide a Name for the Grid to be Saved");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [patternName, onClose, socket]);

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br bg-opacity-90 flex items-center justify-center z-50 
      backdrop-blur-md"
    >
      <div
        className="bg-gradient-to-br from-purple-700 via-black to-gray-900 w-[90vw] max-w-lg rounded-xl shadow-2xl 
        border border-opacity-30 border-white p-6 animate-fadeIn"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1
            className="text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r 
            from-green-400 to-blue-500"
          >
            Save Grid Pattern
          </h1>
          <button
            className="text-white text-lg bg-white bg-opacity-10 hover:bg-opacity-20 p-2 rounded-full transition duration-300"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faClose} size="lg" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center text-white">
          {isRunning ? (
            <p className="text-lg font-light text-center">
              ⏸️ Please pause the game before saving your pattern.
            </p>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter a name for your pattern..."
                value={patternName}
                onChange={(e) => setPatternName(e.target.value)}
                className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-800 text-white 
                border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none transition"
              />
              <button
                onClick={() => {
                  if (patternName.trim() === "") {
                    toast.error(
                      "Please provide a Name for the Grid to be Saved"
                    );
                  } else {
                    savePattern();
                    setTimeout(() => {
                      onClose();
                    }, 250);
                  }
                }}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg 
                hover:scale-105 hover:bg-gradient-to-l active:scale-95 transition-transform duration-300"
              >
                <FontAwesomeIcon icon={faSave} className="mr-2" />
                Save Pattern
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SaveModal;
