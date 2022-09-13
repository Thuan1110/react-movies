import React, { useEffect, useState } from "react";
import MoviesGrid from "../components/Movies/List/MoviesGrid";
import { API_KEY, BASE_URL } from "../config/api-config";
import { category, movieType } from "../config/movie-type";
import useFetch from "../hooks/use-fetch";

const TV = () => {
  const [tvShows, setTvShows] = useState([]);
  const { dataGrid, isLoading, error, loadMoreHandler } = useFetch(
    `${BASE_URL}/${category.tv}/${movieType.popular}?api_key=${API_KEY}&language=en-US`
  );

  useEffect(() => {
    setTvShows(dataGrid);
  }, [dataGrid]);
  return (
    <>
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
    </>
  );
};

export default TV;
