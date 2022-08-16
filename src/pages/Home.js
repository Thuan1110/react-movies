import React, { useCallback, useEffect, useState } from "react";
import MoviesList from "../components/Movies/List/MoviesList";
import MovieSlider from "../components/Movies/List/MovieSlider";
import { API_KEY, BASE_URL } from "../config/api-config";
import { category, movieType } from "../config/movie-type";

const Home = () => {
  const [moviesSlider, setMoviesSlider] = useState([]);
  const [moviesPopular, setMoviesPopular] = useState([]);
  const [moviesTopRated, setMoviesTopRated] = useState([]);
  const [tvPopular, setTvPopular] = useState([]);
  const [tvTopRated, setTvTopRated] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${BASE_URL}/${category.movie}/${movieType.popular}?api_key=${API_KEY}&language=en-US&page=1`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const firstFiveMovies = data.results.slice(0, 5);
      const fivePopularMovies = data.results.slice(5, 11);
      setMoviesSlider(firstFiveMovies);
      setMoviesPopular(fivePopularMovies);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  const fetchTopRatedMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${BASE_URL}/${category.movie}/${movieType.topRated}?api_key=${API_KEY}&language=en-US&page=1`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const fiveTopRatedMovies = data.results.slice(0, 6);
      setMoviesTopRated(fiveTopRatedMovies);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  const fetchPopularTv = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${BASE_URL}/${category.tv}/${movieType.popular}?api_key=${API_KEY}&language=en-US&page=1`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const firstFivePopularTv = data.results.slice(0, 6);
      setTvPopular(firstFivePopularTv);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  const fetchTopRatedTv = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${BASE_URL}/${category.tv}/${movieType.topRated}?api_key=${API_KEY}&language=en-US&page=1`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const firstFiveTopRatedTv = data.results.slice(6, 12);
      setTvTopRated(firstFiveTopRatedTv);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMovies();
    fetchTopRatedMovies();
    fetchPopularTv();
    fetchTopRatedTv();
  }, [fetchMovies, fetchTopRatedMovies, fetchPopularTv, fetchTopRatedTv]);

  return (
    <React.Fragment>
      {error && <div className="centered">{error}</div>}
      {!isLoading && (
        <div>
          <MovieSlider movies={moviesSlider} />
          <MoviesList
            movies={moviesPopular}
            category={category.movie}
            type={movieType.popular}
            title="Popular movies"
          />
          <MoviesList
            movies={moviesTopRated}
            category={category.movie}
            type={movieType.topRated}
            title="Top rated movies"
          />
          <MoviesList
            movies={tvPopular}
            category={category.tv}
            type={movieType.popular}
            title="Popular TV shows"
          />
          <MoviesList
            movies={tvTopRated}
            category={category.tv}
            type={movieType.topRated}
            title="Top rated TV shows"
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default Home;
