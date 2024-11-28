import React from "react";

const SpellInfoModal = ({ show }) => {
  const spells = [
    { key: "f", name: "Freeze", description: "⛔ Freezes the grid in time—like an icy time-out!" },
    { key: "u", name: "Unfreeze", description: "❄️ Brings the grid back to life—melting the freeze!" },
    { key: "e", name: "Earthquake", description: "🌍 Shakes things up! Randomizes parts of the grid." },
    { key: "l", name: "Lightning", description: "⚡ Zap! Strikes down random cells for an electrifying twist." },
  ];

  return (
    <div
      className="absolute top-20 right-4 transform bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 shadow-2xl rounded-xl p-6 w-[90vw] max-w-md 
      border border-opacity-30 border-white text-white animate-fadeIn backdrop-blur-lg backdrop-saturate-150 z-50"
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-extrabold tracking-wide text-white drop-shadow-md">
          🧙‍♂️ Spellbook
        </h1>
      </div>
      <hr className="my-2 border-opacity-50" />
      <ul className="space-y-4">
      {show ? (
        <>
            {spells.map((spell) => (
            <li key={spell.key} className="flex items-start space-x-3">
                <div className="flex-shrink-0 bg-black bg-opacity-25 text-white px-3 py-1 rounded-full text-lg font-bold">
                {spell.key.toUpperCase()}
                </div>
                <div>
                <h2 className="text-xl font-semibold">{spell.name}</h2>
                <p className="text-sm opacity-90">{spell.description}</p>
                </div>
            </li>
            ))}
        </>
      ) : (
          <p className="text-lg italic text-gray-200 mt-4">
          No statistics available in this mode.
          </p>
      )}
      </ul>
      <div className="mt-6 text-center text-sm font-light opacity-75">
        Game of Life - Spell Edition ✨ Powered by Gioele & Richard
      </div>
    </div>
  );
};

export default SpellInfoModal;
