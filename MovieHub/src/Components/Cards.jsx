

// import React from "react";
// const Cards = ({ title, releaseDate, poster, description,vote_average}) =>
// {
// return (
// <div className="max-w-sm rounded-lg overflow-hidden shadow-md
// bg-white hover:shadow-lg transition-shadow duration-300">
// <img
// src={poster}
// alt={title}
// className="w-full h-64 object-cover"
// />
// <div className="p-4">
// <h2 className="text-lg font-bold mb-2
// text-gray-800">{title}</h2>
// <p className="text-sm text-gray-600 mb-4">
// <span className="font-semibold">Release Date : </span>
// {releaseDate}
// </p>
// <p className="text-gray-700 text-sm
// truncate">Description : {description}</p>
// <p className="text-gray-700 text-sm
// truncate">vote-average : {vote_average}</p>

// </div>
// </div>
// );
// };
// export default Cards;
// import React from "react";

// const Cards = ({ title, releaseDate, poster, description, vote_average }) => {
//   return (
//     <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
//       {/* Movie Poster */}
//       <img src={poster} alt={title} className="w-full h-64 object-cover" />

//       {/* Movie Details */}
//       <div className="p-4">
//         <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
//         <p className="text-sm text-gray-600 mb-2">
//           <span className="font-semibold">Release Date:</span> {releaseDate}
//         </p>
//         <p className="text-gray-700 text-sm mb-2">
//           <span className="font-semibold">Description:</span> {description}
//         </p>
//         <p className="text-gray-700 text-sm">
//           <span className="font-semibold">Vote Average:</span> {vote_average}
//         </p>
//       </div>
//     </div>
//   );
// };

// const MovieList = ({ movies }) => {
//   return (
//     <div className="container mx-auto mt-20 px-4">
//       <h2 className="text-2xl font-bold mb-4 text-center">Movie List</h2>
      
//       {/* Responsive Grid Layout */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {movies.map((movie, index) => (
//           <Cards
//             key={index}
//             title={movie.title}
//             releaseDate={movie.releaseDate}
//             poster={movie.poster}
//             description={movie.description}
//             vote_average={movie.vote_average}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MovieList;

import React, { useState } from "react";

const Cards = ({ title, releaseDate, poster, description, vote_average }) => {
  const [isReadMore, setIsReadMore] = useState(false);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
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

