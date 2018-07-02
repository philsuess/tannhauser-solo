import { hot } from "react-hot-loader";
import React from "react";
import { Menu } from "antd";
import { Route, Link, withRouter } from "react-router-dom";
import { Component as JokeReact } from "modules/jokereact";
import { Component as JokeReactRedux } from "modules/jokereactredux";
import { Component as Tutorial } from "modules/todotutorial";
import { Component as DragAndDrop } from "modules/draganddrop";
import * as SoloApp from "modules/tannhauser";
import Home from "../Home";
import * as Todo from "modules/todo";
import itwm from "./itwm.png";
import styles from "./styles.css";
import { RouteComponentProps } from "react-router";

const App = () => (
  <div className={styles.layout}>
    <div className={styles.sider}>
      <img className={styles.logo} src={itwm} />
      <MyMenu />
    </div>
    <main className={styles.content}>
      <Route exact path="/tutorial" component={Tutorial} />
      <Route
        exact
        path="/tannhauser"
        component={() => (
          <SoloApp.App.Component />
        )}
      />
      <Route
        exact
        path="/joke"
        component={() => (
          <JokeReact jokeUri="https://api.icndb.com/jokes/random" />
        )}
      />
      <Route
        exact
        path="/jokeredux"
        component={() => (
          <JokeReactRedux jokesUri="https://api.icndb.com/jokes/random" />
        )}
      />
      <Route exact path="/" component={Home} />
      <Route exact path="/todos" component={Todo.Component} />
      <Route exact path="/draganddrop" component={DragAndDrop} />
    </main>
    <footer className={styles.footer}>
      <div>
        ITWM 2018 •{" "}
        <a
          href="https://gitlab.itwm.fraunhofer.de/OPT/templates/web-frontend-react-typescript"
          target="_blank"
        >
          View on GitLab
        </a>
      </div>
    </footer>
  </div>
);

const MyMenu = withRouter((props: RouteComponentProps<any>) => (
  <Menu
    theme="light"
    mode="vertical"
    className={styles.menu}
    selectedKeys={[props.location.pathname]}
  >
    <Menu.Item key="/">
      <Link to="/">Home</Link>
    </Menu.Item>
    <Menu.Item key="/tutorial">
      <Link to="/tutorial">Tutorial</Link>
    </Menu.Item>
    <Menu.Item key="/tannhauser">
      <Link to="/tannhauser">Tannhauser</Link>
    </Menu.Item>
    <Menu.Item key="/joke">
      <Link to="/joke">Jokes</Link>
    </Menu.Item>
    <Menu.Item key="/jokeredux">
      <Link to="/jokeredux">Jokes II</Link>
    </Menu.Item>
    <Menu.Item key="/todos">
      <Link to="/todos">Todos</Link>
    </Menu.Item>
    <Menu.Item key="/draganddrop">
      <Link to="/draganddrop">Drag & Drop</Link>
    </Menu.Item>
  </Menu>
));

export default hot(module)(App);
