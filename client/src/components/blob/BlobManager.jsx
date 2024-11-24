import React from "react";
import Blob from "./Blob";

function BlobManager() {
  const blobs = [
    {
      id: 1,
      path: "/assets/blob1.svg",
      style: { position: "absolute", top: "10%", left: "20%" },
    },
    {
      id: 2,
      path: "/assets/blob1.svg",
      style: { position: "absolute", top: "30%", left: "70%" },
    },
    {
      id: 3,
      path: "/assets/blob1.svg",
      style: { position: "absolute", top: "60%", left: "10%" },
    },
  ];

  return (
    <div className="absolute w-full h-full">
      {blobs.map((blob) => (
        <Blob
          key={blob.id}
          svgPath={blob.path}
          className="absolute w-[500px] h-auto"
          style={blob.style}
        />
      ))}
    </div>
  );
}

export default BlobManager;
