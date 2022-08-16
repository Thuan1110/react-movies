import React, { useEffect } from "react";
import useDebounce from "../../../hooks/use-debounce";
import styles from "./SearchForm.module.css";

const SearchForm = (props) => {
  const { onSearchMovies, onNavigation, setEnteredText, enteredText } = props;
  const debouncedSearchTerm = useDebounce(enteredText, 1000);

  const changeTextHandler = (event) => {
    setEnteredText(event.target.value);
    onNavigation(event.target.value);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      onSearchMovies(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearchMovies]);

  return (
    <div className={styles.form}>
      <input
        placeholder="Please enter a movie name"
        type="text"
        value={enteredText}
        onChange={changeTextHandler}
      />
    </div>
  );
};

export default SearchForm;
