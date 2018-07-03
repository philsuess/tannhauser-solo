import { hot } from "react-hot-loader";
import React from "react";
import { Route, Link, withRouter } from "react-router-dom";
import * as SoloApp from "modules/tannhauser";
import styles from "./styles.css";

const App = () => (
  <main className={styles.content}>
    <Route
      exact
      path="/"
      component={() => (
        <SoloApp.App.Component />
      )}
    />
  </main>
);

export default hot(module)(App);
