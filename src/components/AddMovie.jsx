import { useState, useCallback } from "react";
import classes from "./AddMovie.module.css";

function AddMovie({ onAddMovie }) {
  const [movie, setMovie] = useState({
    title: "",
    openingText: "",
    releaseDate: "",
  });

  const changeHandler = useCallback((event) => {
    const { name, value } = event.target;

    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  }, []);

  const submitHandler = useCallback(
    (event) => {
      event.preventDefault();

      onAddMovie(movie);

      setMovie({
        title: "",
        openingText: "",
        releaseDate: "",
      });
    },
    [movie, onAddMovie]
  );

  return (
    <section className={classes["add-movie"]}>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={movie.title}
            onChange={changeHandler}
            required
          />
        </div>

        <div className={classes.control}>
          <label htmlFor="openingText">Opening Text</label>
          <textarea
            id="openingText"
            rows="5"
            name="openingText"
            value={movie.openingText}
            onChange={changeHandler}
            required
          />
        </div>

        <div className={classes.control}>
          <label htmlFor="releaseDate">Release Date</label>
          <input
            id="releaseDate"
            type="date"
            name="releaseDate"
            value={movie.releaseDate}
            onChange={changeHandler}
            required
          />
        </div>

        <div className={classes.actions}>
          <button type="submit">Add Movie</button>
        </div>
      </form>
    </section>
  );
}

export default AddMovie;