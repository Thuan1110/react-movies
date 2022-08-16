import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();

  const [fix, setFix] = useState(false);

  const backToHomePageHandler = () => {
    navigate("/");
  };

  const setFixed = () => {
    if (window.scrollY >= 100) {
      setFix(true);
    } else {
      setFix(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", setFixed);

    return () => window.removeEventListener("scroll", setFixed);
  }, []);

  return (
    <header
      className={fix ? [`${styles.header} ${styles.scrolled}`] : styles.header}
    >
      <div className={styles.logo} onClick={backToHomePageHandler}>
        React Movies
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink
              to="/home"
              className={(navData) => (navData.isActive ? styles.active : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movies"
              className={(navData) => (navData.isActive ? styles.active : "")}
            >
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tvs"
              className={(navData) => (navData.isActive ? styles.active : "")}
            >
              Tv Series
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/search"
              className={(navData) => (navData.isActive ? styles.active : "")}
            >
              Search
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
