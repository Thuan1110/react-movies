import React from "react";
import { useNavigate } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { IMG_PATH, ORIGINAL_PATH } from "../../../config/api-config";
import Card from "../../UI/Card";
import styles from "./MovieSlider.module.css";

const MovieSlider = (props) => {
  const { movies } = props;
  const navigate = useNavigate();

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {movies.map((movie) => (
          <SwiperSlide className={styles.swiper} key={movie.id}>
            <img
              className={styles.background}
              src={ORIGINAL_PATH + "/" + movie.backdrop_path}
              alt={movie.title}
            />
            <div className={styles["text-block"]}>
              <div className={styles.overview}>
                <section className={styles.title}>
                  <p>{movie.title}</p>
                </section>
                <section className={styles.description}>
                  <p>{movie.overview}</p>
                </section>

                <button
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  className={styles.btn}
                >
                  Watch Now
                </button>
              </div>
              <div className={styles.poster}>
                <Card className={styles.card}>
                  <img
                    src={IMG_PATH + "/" + movie.poster_path}
                    alt="movie images"
                  />
                </Card>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default MovieSlider;
