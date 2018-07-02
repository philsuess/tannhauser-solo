import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import styles from "shared/joke/styles.css";
import JokeDisplay from "shared/joke/JokeDisplay";

export interface JokeProps {
  jokesUri: string;
  joke: string;
  loadingJoke: boolean;
  loadJoke: (url: string) => any;
}

const Joke = ({ jokesUri, joke, loadingJoke, loadJoke }: JokeProps) => (
  <div className={styles.main}>
    <h1>Joke (React + Redux) </h1>
    <p>
      Demonstrates as react+redux module with asynchronous action dispatching.
      See also the <Link to="/joke">redux-free version</Link>.
    </p>
    <p>
      Open redux devtools in your browser to see what happens when the buttons
      are clicked!
    </p>
    <JokeDisplay joke={joke} loadingJoke={loadingJoke} />
    <div>
      <Button onClick={() => loadJoke(jokesUri)}>Load a new joke</Button>
      <Button onClick={() => loadJoke("http://does.not.exist/lol")}>
        Load a new joke with error
      </Button>
    </div>
  </div>
);

export default Joke;
