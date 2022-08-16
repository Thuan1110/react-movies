import React, { useCallback, useEffect, useState } from "react";
import MoviesGrid from "../components/Movies/List/MoviesGrid";
import { API_KEY, BASE_URL } from "../config/api-config";
import { category, movieType } from "../config/movie-type";

const TV = () => {
  const [tvShows, setTvShows] = useState([]);
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const MAX_PAGE = 500;

  const loadMoreHandler = () => {
    if (page > MAX_PAGE) return;
    setPage((prevPage) => prevPage + 1);
  };

  const fetchTvs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${BASE_URL}/${category.tv}/${movieType.popular}?api_key=${API_KEY}&language=en-US&page=${page}`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      setTvShows((prevTvs) => {
        return [...prevTvs, ...data.results];
      });
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [page]);

  useEffect(() => {
    fetchTvs();
  }, [fetchTvs]);

  return (
    <React.Fragment>
      {error && <div className="centered">{error}</div>}
      {tvShows.length > 0 && (
        <MoviesGrid movies={tvShows} category={category.tv} />
      )}
      {tvShows.length === 0 && <p className="centered">No Movies Found!</p>}
      <div className="button-centered">
        {tvShows.length > 0 && (
          <button onClick={loadMoreHandler}>
            {isLoading ? "Loading" : " Load More"}
          </button>
        )}
      </div>
    </React.Fragment>
  );
};

export default TV;
