import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faClose } from "@fortawesome/free-solid-svg-icons";

function LibraryModal({ socket, onClose, patterns, resetGeneration }) {
  const onPatternClick = (code) => {
      socket.emit("resetGrid");
      socket.emit("applyPattern", { code });
      resetGeneration();
      onClose();
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur">
      <div className="bg-black w-[50vw] h-[70vh] rounded shadow-lg flex flex-col  border-2 border-white">
        <div className="flex justify-end">
          <button
            className="px-4 py-2 rounded text-white bg-transparent hover:bg-red-600 transition-colors duration-500 ease-in-out"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faClose} size="2x" />
          </button>
        </div>
        <div className="flex justify-center items-center">
          <FontAwesomeIcon icon={faBook} size="3x" />

          <h1 className="text-5xl mx-5">Library</h1>
          <FontAwesomeIcon icon={faBook} size="3x" />
        </div>
        <div className="overflow-auto p-4">
          <table className="w-full text-white border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 border-gray-700 py-2 text-left">Pattern Name</th>
                <th className="border-b-2 border-gray-700 py-2 text-left">Pattern Code</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(patterns).map(([name, code], index) => (
                <tr 
                  className="py-2 border-b border-gray-700 cursor-pointer hover:bg-gray-700 hover:text-white transition-colors duration-300" 
                  key={index}
                  onClick={() => onPatternClick(code)}
                >
                  <td 
                    className="py-2 border-b border-gray-700"
                  >
                    {name}
                  </td>
                  <td className="py-2 border-b border-gray-700 font-mono">
                    {code.length > 10 ? `${code.slice(0, 10)}...` : code}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LibraryModal;

