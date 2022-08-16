import React, { useCallback, useEffect, useState } from "react";
import MoviesGrid from "../components/Movies/List/MoviesGrid";
import { API_KEY, BASE_URL } from "../config/api-config";
import { category, movieType } from "../config/movie-type";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const MAX_PAGE = 500;

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${BASE_URL}/${category.movie}/${movieType.popular}?api_key=${API_KEY}&language=en-US&page=${page}`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setMovies((prevMovies) => {
        return [...prevMovies, ...data.results];
      });
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const loadMoreHandler = () => {
    if (page > MAX_PAGE) return;
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <React.Fragment>
      {error && <div className="centered">{error}</div>}
      {movies.length > 0 && (
        <MoviesGrid movies={movies} category={category.movie} />
      )}
      {movies.length === 0 && <p className="centered">No Movies Found!</p>}
      <div className="button-centered">
        {movies.length > 0 && (
          <button onClick={loadMoreHandler}>
            {isLoading ? "Loading" : " Load More"}
          </button>
        )}
      </div>
    </React.Fragment>
  );
};

export default Movies;
