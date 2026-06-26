import { useState } from "react";
import MoviesList from "./components/Movielist";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

 async function fetchMoviesHandler() {
  setIsLoading(true);
  setError(null);

  try {
    const response = await fetch("https://swapi.py4e.com/api/films/");

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();

    const loadedMovies = data.results.map((movie) => ({
      id: movie.episode_id,
      title: movie.title,
      openingText: movie.opening_crawl,
      releaseDate: movie.release_date,
    }));

    setMovies(loadedMovies);
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
}

let content = (
  <div className="empty-state">
    <div className="empty-icon">🎬</div>
    <h2>No Movies Found</h2>
    <p>Click the button above to fetch movies.</p>
  </div>
);

if (isLoading) {
  content = <p className="loader">Loading...</p>;
}

if (error) {
  content = <p className="error">{error}</p>;
}

if (!isLoading && !error && movies.length > 0) {
  content = <MoviesList movies={movies} />;
}

  return (
    <>
      
      <section className="card">
        <button className="fetch-btn" onClick={fetchMoviesHandler}>
          Fetch Movies
        </button>
      </section>

     
      <section className="card">
        {content}
      </section>
    </>
  );
}

export default App;