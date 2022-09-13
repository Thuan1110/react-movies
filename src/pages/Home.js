import React, { useEffect, useState } from "react";
import MovieSlider from "../components/Movies/List/MovieSlider";
import MoviesList from "../components/Movies/List/MoviesList";
import { API_KEY, BASE_URL } from "../config/api-config";
import { category, movieType } from "../config/movie-type";
import useFetch from "../hooks/use-fetch";

const Home = () => {
  const [moviesSlider, setMoviesSlider] = useState([]);
  const [moviesPopular, setMoviesPopular] = useState([]);
  const [moviesTopRated, setMoviesTopRated] = useState([]);
  const [tvPopular, setTvPopular] = useState([]);
  const [tvTopRated, setTvTopRated] = useState([]);

  const { dataList, error, isLoading } = useFetch(
    `${BASE_URL}/${category.movie}/${movieType.popular}?api_key=${API_KEY}&language=en-US`
  );

  const { dataList: moviesTopRate } = useFetch(
    `${BASE_URL}/${category.movie}/${movieType.topRated}?api_key=${API_KEY}&language=en-US`
  );

  const { dataList: tvsPopular } = useFetch(
    `${BASE_URL}/${category.tv}/${movieType.popular}?api_key=${API_KEY}&language=en-US`
  );

  const { dataList: tvsTopRate } = useFetch(
    `${BASE_URL}/${category.tv}/${movieType.topRated}?api_key=${API_KEY}&language=en-US`
  );

  useEffect(() => {
    setMoviesSlider(dataList);
    setMoviesPopular(dataList);
    setMoviesTopRated(moviesTopRate);
    setTvPopular(tvsPopular);
    setTvTopRated(tvsTopRate);
  }, [dataList, moviesTopRate, tvsPopular, tvsTopRate]);

  return (
    <>
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
    </>
  );
};

export default Home;
