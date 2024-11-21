import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faClose } from "@fortawesome/free-solid-svg-icons";

function LibraryModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur">
      <div className="bg-black w-[50vw] h-[70vh] rounded shadow-lg flex flex-col  border-2 border-white">
        <div className="flex justify-end">
          <button
            className="px-4 py-2 rounded text-white border-white border-2 hover:bg-red-600"
            onClick={onClose}
          >
            <FontAwesomeIcon
              icon={faClose}
              size="xl hover:text-white transition-all"
            />
          </button>
        </div>
        <div className="flex justify-center items-center">
          <FontAwesomeIcon icon={faBook} size="3x" />

          <h1 className="text-5xl mx-5">Library</h1>
          <FontAwesomeIcon icon={faBook} size="3x" />
        </div>
      </div>
    </div>
  );
}

export default LibraryModal;
