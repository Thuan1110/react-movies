import React from "react";
import { IMG_PATH } from "../../../config/api-config";
import Card from "../../UI/Card";
import styles from "./MovieDetail.module.css";

const MovieDetail = (props) => {
  const { movieData, castData, backDropPath, posterPath, category } = props;

  let genres = movieData.genres.map((genre) => (
    <ul className={styles["genres-list"]}>
      <li key={genre.id}>{genre.name}</li>
    </ul>
  ));

  let castsList = castData.map((cast) => (
    <ul className={styles["casts-list"]}>
      <li key={cast.cast_id}>
        {cast.profile_path === null ? (
          <div>
            <img
              src="/src/assets/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg"
              alt=""
            />
          </div>
        ) : (
          <img src={`${IMG_PATH}/${cast.profile_path}`} alt="" />
        )}
        <p>{cast.name}</p>
        <p className={styles.character}>{cast.character}</p>
      </li>
    </ul>
  ));

  return (
    <>
      <div className={styles.background}>
        <img src={backDropPath} alt="" />
      </div>

      <div className={styles.container}>
        <div className={styles.poster}>
          <Card className={styles.card}>
            <img src={posterPath} alt="" />
            <button className={styles.btn}>Play</button>
          </Card>
        </div>
        <div className={styles.detail}>
          <p className={styles.title}>
            {category === "movie" ? movieData.title : movieData.name}
          </p>
          <p className={styles["release-date"]}>
            <span> Release date:</span>
            {category === "movie"
              ? movieData.releaseDate
              : movieData.firstAirDate}
          </p>
          <div className={styles["genres-container"]}>{genres}</div>
          <p className={styles.overview}>
            {category === "movie" ? movieData.overview : movieData.overview}
          </p>

          <span>Casts</span>
          <div className={styles.casts}>{castsList}</div>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
