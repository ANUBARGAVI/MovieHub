const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/moviesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const movieSchema = new mongoose.Schema({
  title: String,
  releaseDate: String,
  poster: String,
  description: String,
  vote_average: Number,
});

const Movie = mongoose.model("Movie", movieSchema);


app.post("/api/movies/save", async (req, res) => {
  try {
    const { title, releaseDate, poster, description, vote_average } = req.body;

    
    const fullPoster = poster.startsWith("https://") ? poster : `https://image.tmdb.org/t/p/w500${poster}`;

    const newMovie = new Movie({ title, releaseDate, poster: fullPoster, description, vote_average });
    await newMovie.save();

    res.status(201).json({ message: "Movie saved successfully", movie: newMovie });
  } catch (error) {
    res.status(500).json({ error: "Failed to save movie" });
  }
});


app.get("/api/movies/saved", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch saved movies" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
