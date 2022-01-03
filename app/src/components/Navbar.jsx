import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/App.module.css";

function Navbar() {
  return (
    <div className={styles.nav}>
      <h2>Github API</h2>
      <nav className={styles.navbar}>
        <Link to="/">User</Link> | <Link to="/repo">Repo</Link>
      </nav>
    </div>
  );
}

export default Navbar;
