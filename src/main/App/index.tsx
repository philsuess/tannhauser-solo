import { hot } from "react-hot-loader";
import React from "react";
import { Route, Link, withRouter } from "react-router-dom";
import * as SoloApp from "modules/tannhauser";
import styles from "./styles.css";

const App = () => (
  <div className={styles.layout}>
    <main className={styles.content}>
      <Route
        exact
        path="/"
        component={() => (
          <SoloApp.App.Component />
        )}
      />
    </main>
  </div>
);

export default hot(module)(App);
