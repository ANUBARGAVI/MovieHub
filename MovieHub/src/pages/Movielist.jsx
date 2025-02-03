"use client";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cards from "../components/Cards";
import Navscroll from "../components/Navscroll"; // Import Navbar Component

export default function Movielist({ title }) {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Get the current route

  // Fetch movies based on the category (popular, top, upcoming, now_playing)
  const fetchMovies = async (category) => {
    try {
      setLoading(true);
      let url = "";
      if (category === "popular") {
        url = "https://api.themoviedb.org/3/movie/popular?api_key=352f6ee736e068d8573881e0784d0afa&language=en-US&page=1";
      } else if (category === "top") {
        url = "https://api.themoviedb.org/3/movie/top_rated?api_key=352f6ee736e068d8573881e0784d0afa&language=en-US&page=1";
      } else if (category === "upcoming") {
        url = "https://api.themoviedb.org/3/movie/upcoming?api_key=352f6ee736e068d8573881e0784d0afa&language=en-US&page=1";
      } else if (category === "now") {
        url = "https://api.themoviedb.org/3/movie/now_playing?api_key=352f6ee736e068d8573881e0784d0afa&language=en-US&page=1";
      }

      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results); // Store all movies
      setFilteredMovies(data.results); // Initially show all movies
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Determine category from the path (e.g., 'popular', 'top', 'now', or 'upcoming')
    const path = location.pathname.split('/')[2]; // Extract the category from the URL path
    fetchMovies(path || "popular"); // Default to "popular" if no category is specified
  }, [location]); // Re-fetch whenever the route changes

  // Handle search inside Movielist
  const handleSearch = (query) => {
    if (query.trim() === "") {
      alert("Please enter a search term.");
      return;
    }
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  
  const handleClear = () => {
    setFilteredMovies(movies); 
  };

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  return (
    <div>
      <Navscroll onSearch={handleSearch} onClear={handleClear} /> 
      <div className="movie-list">
        <h2>{title}</h2> 
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Cards
              key={movie.id}
              title={movie.title}
              releaseDate={movie.release_date}
              poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              description={movie.overview}
              vote_average={movie.vote_average}
            />
          ))
        ) : (
          <p className="text-center text-gray-600">No movies found.</p>
        )}
      </div>
    </div>
  );
}
