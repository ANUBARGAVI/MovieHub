"use client";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cards from "../components/Cards";
import Navscroll from "../components/Navscroll";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  
  const fetchMovies = async (category) => {
    try {
      setLoading(true);
      const apiKey = "352f6ee736e068d8573881e0784d0afa";
      const baseUrl = "https://api.themoviedb.org/3/movie/";
      const categories = {
        popular: "popular",
        top: "top_rated",
        upcoming: "upcoming",
        now: "now_playing",
      };

      const url = `${baseUrl}${categories[category] || "popular"}?api_key=${apiKey}&language=en-US&page=1`;

      const response = await fetch(url);
      const data = await response.json();
      if (data.results) {
        setMovies(data.results);
        setFilteredMovies(data.results);
      } else {
        setMovies([]);
        setFilteredMovies([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
      setFilteredMovies([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    const path = location.pathname.split("/")[2]; 
    fetchMovies(path || "popular");
  }, [location.pathname]);

  const handleSearch = (query) => {
    if (!query.trim()) {
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

  return (
    <div>
      <Navscroll onSearch={handleSearch} onClear={handleClear} />
      <div className="container mx-auto mt-24 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">🎬 Movie List</h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : filteredMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {filteredMovies.map((movie) => (
              <Cards
                key={movie.id}
                title={movie.title}
                releaseDate={movie.release_date}
                poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                description={movie.overview}
                vote_average={movie.vote_average}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No movies found.</p>
        )}
      </div>
    </div>
  );
}
