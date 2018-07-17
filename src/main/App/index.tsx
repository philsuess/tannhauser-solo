import { hot } from "react-hot-loader";
import React from "react";
import { Route, Link, withRouter } from "react-router-dom";
import * as SoloApp from "modules/tannhauser";
import styles from "./styles.scss";

const App = () => (
  <main className={styles.content}>
    <Route
      exact
      path="/"
      component={() => (
        <SoloApp.App.Main />
      )}
    />
  </main>
);

export default hot(module)(App);
