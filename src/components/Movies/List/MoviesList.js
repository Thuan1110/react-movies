import React from "react";
import { Link } from "react-router-dom";
import MoviesListItem from "../Item/MoviesListItem";
import styles from "./MoviesList.module.css";

const MoviesList = (props) => {
  const { movies, category, title } = props;
  let link = "";
  if (category === "movie") {
    link = "movies";
  } else {
    link = "tvs";
  }
  return (
    <div className={styles.movies}>
      <div className={styles.sub}>
        <p className={styles.title}>{title}</p>
        <Link to={`/${link}`} className={styles["link-text"]}>
          <p className={styles.action}>View More</p>
        </Link>
      </div>
      <ul>
        {movies.map((movie) => (
          <MoviesListItem
            key={movie.id}
            id={movie.id}
            title={movie.title ? movie.title : movie.name}
            posterPath={movie.poster_path}
            category={category}
          />
        ))}
      </ul>
    </div>
  );
};

export default MoviesList;
