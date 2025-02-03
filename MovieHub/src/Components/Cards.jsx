

import React from "react";
const Cards = ({ title, releaseDate, poster, description,vote_average}) =>
{
return (
<div className="max-w-sm rounded-lg overflow-hidden shadow-md
bg-white hover:shadow-lg transition-shadow duration-300">
<img
src={poster}
alt={title}
className="w-full h-64 object-cover"
/>
<div className="p-4">
<h2 className="text-lg font-bold mb-2
text-gray-800">{title}</h2>
<p className="text-sm text-gray-600 mb-4">
<span className="font-semibold">Release Date : </span>
{releaseDate}
</p>
<p className="text-gray-700 text-sm
truncate">Description : {description}</p>
<p className="text-gray-700 text-sm
truncate">vote-average : {vote_average}</p>

</div>
</div>
);
};
export default Cards;

