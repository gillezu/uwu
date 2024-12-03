import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faUpload } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";

export const LoadModal = ({ onClose, socket }) => {
  const [patternRLE, setPatternRLE] = useState("");

  const loadPattern = () => {
    console.log(patternRLE);
    socket.emit("loadPattern", patternRLE);
  };

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br bg-opacity-90 flex items-center justify-center z-50 
      backdrop-blur-md"
    >
      <div
        className="bg-gradient-to-br from-purple-700 via-black to-gray-900 w-[90vw] max-w-lg rounded-xl shadow-2xl 
        border border-opacity-30 border-white p-6 animate-fadeIn"
      >
        <div className="flex justify-between items-center mb-6">
          <h1
            className="text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r 
            from-green-400 to-blue-500"
          >
            Load Grid Pattern
          </h1>
          <button
            className="text-white text-lg bg-white bg-opacity-10 hover:bg-opacity-20 p-2 rounded-full transition duration-300"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faClose} size="lg" />
          </button>
        </div>
        <div className="flex flex-col items-center text-white">
          <input
            type="text"
            placeholder="Enter the RLE code for your pattern..."
            value={patternRLE}
            onChange={(e) => setPatternRLE(e.target.value)}
            className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-800 text-white 
                border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none transition"
          />
          <button
            onClick={() => {
              if (patternRLE.trim() === "") {
                toast.error(
                  "Please provide a RLE Code for the Grid to be Saved",
                );
              } else {
                loadPattern();
                setTimeout(() => {
                  onClose();
                }, 250);
              }
            }}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg 
                hover:scale-105 hover:bg-gradient-to-l active:scale-95 transition-transform duration-300"
          >
            <FontAwesomeIcon icon={faUpload} className="mr-2" />
            Load Pattern
          </button>
        </div>
      </div>
    </div>
  );
};
