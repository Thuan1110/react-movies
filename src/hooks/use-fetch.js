import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataList, setDataList] = useState([]);
  const [dataGrid, setDataGrid] = useState([]);
  const [page, setPage] = useState(1);
  const MAX_PAGE = 500;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${url}&page=${page}`);
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        const firstSixMovies = data.results.slice(0, 6);
        setDataList(firstSixMovies);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };

    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const responses = await fetch(`${url}&page=${page}`);

        if (!responses.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await responses.json();
        setDataGrid((prevMovies) => {
          return [...prevMovies, ...data.results];
        });
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };

    fetchData();
    fetchMovies();
  }, [page, url]);

  const loadMoreHandler = () => {
    if (page > MAX_PAGE) return;
    setPage((prevPage) => prevPage + 1);
  };

  return {
    dataList,
    isLoading,
    error,
    dataGrid,
    loadMoreHandler,
  };
};

export default useFetch;
