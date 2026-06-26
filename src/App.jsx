import { useState, useEffect, useCallback, useRef } from "react";
import MoviesList from "./components/Movielist";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false);

const addMovieHandler = useCallback(async (movie) => {
  try {
    const response = await fetch(
      "https://movieapp-c022f-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add movie.");
    }

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}, []);

  const retryTimeout = useRef(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://swapi.py4e.com/api/films/");

      if (!response.ok) {
        throw new Error("Something went wrong... Retrying");
      }

      const data = await response.json();

      const loadedMovies = data.results.map((movie) => ({
        id: movie.episode_id,
        title: movie.title,
        openingText: movie.opening_crawl,
        releaseDate: movie.release_date,
      }));

      setMovies(loadedMovies);
      setRetrying(false);
    } catch (err) {
      setError(err.message);
      setRetrying(true);

      retryTimeout.current = setTimeout(() => {
        fetchMoviesHandler();
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMoviesHandler();

    return () => {
      clearTimeout(retryTimeout.current);
    };
  }, [fetchMoviesHandler]);

  function cancelRetry() {
    clearTimeout(retryTimeout.current);
    setRetrying(false);
    setError("Retry cancelled.");
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
    content = (
      <>
        <p className="error">{error}</p>

        {retrying && (
          <button className="cancel-btn" onClick={cancelRetry}>
            Cancel Retry
          </button>
        )}
      </>
    );
  }

  if (!isLoading && !error && movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

 return (
  <>
    <AddMovie onAddMovie={addMovieHandler} />

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