import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

function SaveToLibraryButton({ onOpenSaveModal }) {
  return (
    <button
      onClick={onOpenSaveModal}
      className="w-[22.5%] hover:bg-transparent hover:border-white border-2 transition-all duration-500"
    >
      <FontAwesomeIcon icon={faDownload} />
    </button>
  );
}

export default SaveToLibraryButton;
