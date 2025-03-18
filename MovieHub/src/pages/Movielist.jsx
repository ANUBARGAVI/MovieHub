

"use client";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cards from "../components/Cards";
import Navscroll from "../components/Navscroll";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSaved, setShowSaved] = useState(false); 
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

  
  const fetchSavedMovies = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/movies/saved");
      const data = await response.json();
      setSavedMovies(data);
      setShowSaved(true); 
    } catch (error) {
      console.error("Error fetching saved movies:", error);
    }
  };

  useEffect(() => {
    const path = location.pathname.split("/")[2];
    fetchMovies(path || "popular");
    fetchSavedMovies();
  }, [location.pathname]);

  
  const saveMovie = async (movie) => {
    try {
      
      const isAlreadySaved = savedMovies.some((saved) => saved.title === movie.title);
      if (isAlreadySaved) {
        alert("⚠️ This movie is already saved!");
        return;
      }

      const movieData = {
        title: movie.title,
        releaseDate: movie.release_date,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        description: movie.overview,
        vote_average: movie.vote_average,
      };

      const response = await fetch("http://localhost:5000/api/movies/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movieData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("✅ Movie saved successfully!");
        setSavedMovies([...savedMovies, movieData]); 
      } else {
        alert("❌ Error saving movie: " + data.error);
      }
    } catch (error) {
      console.error("Error saving movie:", error);
      alert("❌ Failed to save movie.");
    }
  };

  
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

  // ✅ Clear search results
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
                onSave={() => saveMovie(movie)} // ✅ Add save button
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No movies found.</p>
        )}

        

        {/* ✅ Display saved movies only when button is clicked */}
        {showSaved && (
          <>
            <h2 className="text-2xl font-bold mt-10 text-center text-gray-800">🎥 Saved Movies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-6">
              {savedMovies.length > 0 ? (
                savedMovies.map((movie) => (
                  <Cards
                    key={movie._id}
                    title={movie.title}
                    releaseDate={movie.releaseDate} // ✅ Fixed field name
                    poster={movie.poster} // ✅ Ensures correct image path
                    description={movie.description}
                    vote_average={movie.vote_average}
                  />
                ))
              ) : (
                <p className="text-center text-gray-600 w-full">No saved movies found.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
