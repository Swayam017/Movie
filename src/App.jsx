import { useState } from "react";
import MoviesList from "./components/Movielist";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchMoviesHandler() {
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://swapi.py4e.com/api/films/"
      );

      const data = await response.json();

      const loadedMovies = data.results.map((movie) => ({
        id: movie.episode_id,
        title: movie.title,
        openingText: movie.opening_crawl,
        releaseDate: movie.release_date,
      }));

      setMovies(loadedMovies);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  }

  return (
    <>
      <section className="fetch-section">
        <button className="fetch-btn" onClick={fetchMoviesHandler}>
          Fetch Movies
        </button>
      </section>

      <section>
  {isLoading && <p className="loader">Loading...</p>}

  {!isLoading && movies.length > 0 && (
    <MoviesList movies={movies} />
  )}

  {!isLoading && movies.length === 0 && (
    <p className="no-movies">No movies found.</p>
  )}
</section>
    </>
  );
}

export default App;