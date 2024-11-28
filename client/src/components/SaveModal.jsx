import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSave } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";

function SaveModal({ onClose, socket, isRunning }) {
  const [patternName, setPatternName] = useState("");

  const savePattern = () => {
    socket.emit("addPattern", patternName);
  };

  // Event listener for "Enter" key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        savePattern();
        const timeOut = setTimeout(() => {
          onClose();
        }, 250);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [patternName, onClose, socket]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur">
      <div className="bg-black w-[50vw] h-[20vh] rounded shadow-lg flex flex-col border-2 border-white">
        <div className=" relative flex justify-between items-start p-5 border-b border-white">
          <div className="w-[100%] flex justify-center items-center text-center">
            <h1 className="text-5xl mx-5 text-white">
              Save Grid Pattern to Library
            </h1>
          </div>
          <div className="absolute right-3">
            <button
              className="px-4 py-2 rounded text-white bg-transparent border-2 hover:border-white
              transition-colors duration-500 ease-in-out"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faClose} size="2x" />
            </button>
          </div>
        </div>
        <div className="p-10 flex flex-col justify-center items-center text-white">
          {isRunning ? (
            <p> Please Stop Game to SavePattern</p>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter Name for Pattern..."
                value={patternName}
                onChange={(e) => setPatternName(e.target.value)}
                className={`text-white w-1/2 mt-10 mb-5 px-3 py-2 rounded border border-gray-300 
            focus:outline-none focus:ring-2 focus:ring-white`}
              />
              <button
                onClick={() => {
                  if (patternName === "") {
                    toast.error(
                      "Please provide a Name for the Grid to be Saved",
                    );
                  } else {
                    savePattern();
                    const timeOut = setTimeout(() => {
                      onClose();
                    }, 250);
                  }
                }}
                className="mb-10 mt-5 border-2 hover:scale-105 hover:border-white active:scale-95 hover:bg-transparent"
              >
                <FontAwesomeIcon icon={faSave} size="2x" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SaveModal;
