import React, { useCallback, useEffect, useState } from "react";
import YouTube from "react-youtube";
import { API_KEY, BASE_URL } from "../../../config/api-config";
import styles from "./MovieTrailer.module.css";

const MovieTrailer = (props) => {
  const [trailers, setTrailers] = useState([]);
  const { id, category } = props;

  const fetchVideos = useCallback(async () => {
    const response = await fetch(
      `${BASE_URL}/${category}/${id}/videos?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    const trailerType = data.results.filter(
      (result) => result.type === "Trailer"
    );
    setTrailers(trailerType);
  }, [category, id]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const opts = {
    height: "720",
    width: "1200",
    playerVars: {
      origin: window.location.href,
    },
  };

  return (
    <div className={styles.trailer}>
      <p>Trailers</p>
      {trailers.length > 0 &&
        trailers.map((trailer) => (
          <YouTube videoId={trailer.key} opts={opts} />
        ))}
      {trailers.length === 0 && <p className="centered">No Trailers Found!</p>}
    </div>
  );
};

export default MovieTrailer;
