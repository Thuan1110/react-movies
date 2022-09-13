import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieDetail from "../components/Movies/Detail/MovieDetail";
import MovieTrailer from "../components/Movies/Detail/MovieTrailer";
import MoviesList from "../components/Movies/List/MoviesList";
import Loader from "../components/UI/Loader";
import {
  API_KEY,
  BASE_URL,
  IMG_PATH,
  ORIGINAL_PATH,
} from "../config/api-config";

const Detail = () => {
  const params = useParams();
  const { id, category } = params;

  const [movieData, setMovieData] = useState({
    backDropPath: "",
    title: "",
    posterPath: "",
    genres: [],
    overview: "",
    releaseDate: "",
    name: "",
    firstAirDate: "",
  });

  const [casts, setCasts] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const backGroundImg = ORIGINAL_PATH + "/" + movieData.backDropPath;
  const posterImg = IMG_PATH + "/" + movieData.posterPath;

  const fetchMovieDetail = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${BASE_URL}/${category}/${id}?api_key=${API_KEY}&language=en-US`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const backDropPath = data.backdrop_path;
      const title = data.title;
      const posterPath = data.poster_path;
      const genres = data.genres;
      const overview = data.overview;
      const releaseDate = data.release_date;
      const name = data.name;
      const firstAirDate = data.first_air_date;

      setMovieData({
        backDropPath: backDropPath,
        title: title,
        posterPath: posterPath,
        genres: genres,
        overview: overview,
        releaseDate: releaseDate,
        name: name,
        firstAirDate: firstAirDate,
      });
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [category, id]);

  const fetchCasts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${BASE_URL}/${category}/${id}/credits?api_key=${API_KEY}&language=en-US`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const casts = data.cast.slice(0, 5);
      setCasts(casts);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [category, id]);

  const fetchSimilarMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${BASE_URL}/${category}/${id}/similar?api_key=${API_KEY}&language=en-US`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const similar = data.results.slice(0, 6);
      setSimilarMovies(similar);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [category, id]);

  useEffect(() => {
    fetchMovieDetail();
    fetchCasts();
    fetchSimilarMovies();
  }, [fetchCasts, fetchMovieDetail, fetchSimilarMovies]);

  return (
    <>
      {error && <div className="centered">{error}</div>}
      {isLoading && (
        <div className="centered">
          <Loader />
        </div>
      )}
      {!isLoading && (
        <>
          <MovieDetail
            movieData={movieData}
            castData={casts}
            backDropPath={backGroundImg}
            posterPath={posterImg}
            category={category}
          />
          <MovieTrailer key={id} id={id} category={category} />
          <MoviesList
            movies={similarMovies}
            category={category}
            type="similar"
            title="Similar movies"
          />
        </>
      )}
    </>
  );
};

export default Detail;
