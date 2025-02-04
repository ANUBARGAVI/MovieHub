

import React, { useState } from "react";

const Cards = ({ title, releaseDate, poster, description, vote_average }) => {
  const [isReadMore, setIsReadMore] = useState(false);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-transform duration-300 transform hover:scale-105">
    
      <img src={poster} alt={title} className="w-full h-80 object-cover" />

  
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-semibold">Release Date:</span> {releaseDate}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-semibold">Vote Average:</span> {vote_average}
        </p>
        <p className="text-sm text-gray-700 mb-3">
          <span className="font-semibold">Description:</span> 
          {isReadMore ? description : description.slice(0, 150) + "..."}
          <button onClick={toggleReadMore} className="text-blue-500 ml-2">
            {isReadMore ? "Read Less" : "Read More"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Cards;

