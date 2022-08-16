import React from "react";
import { useNavigate } from "react-router-dom";
import { IMG_PATH } from "../../../config/api-config";
import Card from "../../UI/Card";
import styles from "./MovieGridItem.module.css";

const MovieGridItem = (props) => {
  const { id, title, posterPath, category } = props;
  const imagePath = IMG_PATH + "/" + posterPath;

  const navigate = useNavigate();

  const navigation = () => {
    navigate(`/${category}/${id}`);
  };

  return (
    <li className={styles.item} key={id}>
      <Card className={styles.card} onClick={navigation}>
        <img src={imagePath} alt="movie images" />
        <p>{title}</p>
      </Card>
    </li>
  );
};

export default MovieGridItem;
