import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>React Movies</div>
      <div className={styles.container}>
        <ul>
          <li>Home</li>
          <li>Contact us</li>
          <li>Term of services</li>
          <li>About us</li>
        </ul>
        <ul>
          <li>Live</li>
          <li>FAQ</li>
          <li>Premium</li>
          <li>Privacy policy</li>
        </ul>
        <ul>
          <li>You must watch</li>
          <li>Recent release</li>
          <li>Top IMDB</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
