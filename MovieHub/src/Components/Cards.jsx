

import React, { useState } from "react";

const Cards = ({ title, releaseDate, poster, description = "", vote_average, onSave }) => {
  const [isReadMore, setIsReadMore] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const handleSaveMovie = async () => {
    setIsSaving(true);
    try {
      await onSave();
    } catch (error) {
      console.error("Error saving movie:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-transform duration-300 transform hover:scale-105">
      {/* Movie Poster */}
      <img src={poster} alt={title} className="w-full h-80 object-cover" />

      {/* Movie Details */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-semibold">Release Date:</span> {releaseDate}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-semibold">Vote Average:</span> ⭐ {vote_average}
        </p>

        {/* Read More / Read Less with Safe Check */}
        <p className="text-sm text-gray-700 mb-3">
          <span className="font-semibold">Description:</span> 
          {description ? (
            isReadMore ? description : description.slice(0, 150) + "..."
          ) : (
            "No description available."
          )}
          {description && (
            <button onClick={toggleReadMore} className="text-blue-500 ml-2">
              {isReadMore ? "Read Less" : "Read More"}
            </button>
          )}
        </p>

        {/* ✅ Save Movie Button */}
        {onSave && (
          <button
            className={`mt-2 px-4 py-2 text-white rounded w-full ${
              isSaving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
            }`}
            onClick={handleSaveMovie}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Movie"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Cards;
