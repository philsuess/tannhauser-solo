import "babel-polyfill";
import { hot } from "react-hot-loader";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "main/App";
import createStore from "./redux/createStore";

const store = createStore();

const AppWithProvider = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

render(AppWithProvider, document.getElementById("root"));
