import React from "react";
import MovieGridItem from "../Item/MovieGridItem";
import styles from "./MoviesGrid.module.css";

const MoviesGrid = (props) => {
  const { movies, category } = props;

  return (
    <div className={styles.movies}>
      <ul>
        {movies.map((movie) => (
          <MovieGridItem
            key={movie.id}
            id={movie.id}
            title={category === "movie" ? movie.title : movie.name}
            posterPath={movie.poster_path}
            category={category}
          />
        ))}
      </ul>
    </div>
  );
};

export default MoviesGrid;
