import React, { useCallback, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import SearchForm from "../components/Movies/Form/SearchForm";
import MoviesGrid from "../components/Movies/List/MoviesGrid";
import Loader from "../components/UI/Loader";
import { API_KEY, BASE_URL } from "../config/api-config";
import { category } from "../config/movie-type";

const Search = () => {
  const [searchList, setSearchList] = useState([]);
  const [enteredText, setEnteredText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const CURRENT_PAGE = 1;
  const navigate = useNavigate();

  const searchMoviesHandler = useCallback(async (text) => {
    setIsLoading(true);
    setError(null);
    setEnteredText(text);
    if (text.trim().length > 0) {
      try {
        const response = await fetch(
          `${BASE_URL}/search/${category.movie}?api_key=${API_KEY}&language=en-US&page=${CURRENT_PAGE}&include_adult=false&query=${text}`
        );

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const data = await response.json();
        setSearchList(data.results);
      } catch (err) {
        setError(err.message);
      }
    } else {
      setEnteredText("");
      setSearchList([]);
    }
    setIsLoading(false);
  }, []);

  const navigationHandler = (text) => {
    if (text.trim().length === 0) {
      navigate("/search");
      setSearchList([]);
    } else {
      navigate({
        pathname: "/search",
        search: `?${createSearchParams({
          name: text,
        })}`,
      });
    }
  };

  return (
    <React.Fragment>
      <SearchForm
        enteredText={enteredText}
        setEnteredText={setEnteredText}
        onNavigation={navigationHandler}
        onSearchMovies={searchMoviesHandler}
      />
      {error && <div className="centered">{error}</div>}

      {isLoading && (
        <div className="centered">
          <Loader />
        </div>
      )}

      {!isLoading && (
        <>
          {searchList.length > 0 && enteredText.trim().length > 0 && (
            <MoviesGrid movies={searchList} category={category.movie} />
          )}
          {searchList.length === 0 && enteredText.trim().length > 0 && (
            <p className="centered">No Movies Found!</p>
          )}
        </>
      )}
    </React.Fragment>
  );
};

export default Search;
