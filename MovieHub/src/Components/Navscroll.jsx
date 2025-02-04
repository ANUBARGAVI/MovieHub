import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Navscroll({ onSearch, onClear }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); 

  const handleSearch = () => {
    if (query.trim() !== "") {
      onSearch(query);
    }
  };

  const handleClear = () => {
    setQuery("");
    onClear();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  
  const getActiveClass = (path) => {
    return location.pathname.includes(path) ? "text-yellow-500" : "text-black";
  };

  return (
    <>
      
      <nav className="bg-green-100 text-white fixed top-0 w-full z-50 shadow-md">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          
          <Link to="/" className="text-2xl font-bold text-black">
            MovieHub
          </Link>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none">
            {isOpen ? (
              <span className="text-2xl">&#10005;</span>
            ) : (
              <span className="text-2xl">&#9776;</span>
            )}
          </button>

          {/* Navigation Links */}
          <div className={`md:flex gap-6 ${isOpen ? "flex flex-col w-full items-center bg-green-200 mt-3 p-3" : "hidden md:flex"}`}>
            <Link to="/" className={`hover:text-gray-700 ${getActiveClass("home")}`}>Home</Link>
            <Link to="/movies/top" className={`hover:text-gray-700 ${getActiveClass("top")}`}>Top Rated</Link>
            <Link to="/movies/popular" className={`hover:text-gray-700 ${getActiveClass("popular")}`}>Popular</Link>
            <Link to="/movies/upcoming" className={`hover:text-gray-700 ${getActiveClass("upcoming")}`}>Upcoming</Link>
            <Link to="/movies/now" className={`hover:text-gray-700 ${getActiveClass("now")}`}>Currently Playing</Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-2">
            <input
              type="text"
              className="px-3 py-1 rounded-md text-black focus:ring-2 focus:ring-blue-300"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSearch}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md"
            >
              Search
            </button>
            <button
              onClick={handleClear}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isOpen && (
          <div className="flex flex-col items-center p-3 bg-green-200 md:hidden">
            <input
              type="text"
              className="px-3 py-1 rounded-md text-black focus:ring-2 focus:ring-blue-300"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="flex mt-2 gap-2">
              <button
                onClick={handleSearch}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md"
              >
                Search
              </button>
              <button
                onClick={handleClear}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navscroll;
