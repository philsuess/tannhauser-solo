import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.css";

export default () => (
  <div>
    <h1>Welcome to the react/typescript web application template!</h1>

    <p>
      Choose one of the pages from the menu for some examples. A good place to
      start is the <Link to="/tutorial">tutorial</Link>.
    </p>
  </div>
);
