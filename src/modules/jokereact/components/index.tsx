import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import JokeDisplay from "shared/joke/JokeDisplay";
import styles from "shared/joke/styles.css";

interface JokeState {
  joke: string;
  loading: boolean;
}

interface JokeProps {
  jokeUri: string;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default class Joke extends React.Component<JokeProps, JokeState> {
  state: JokeState = { joke: "no joke loaded", loading: false };

  private async loadJoke() {
    this.setState({ ...this.state, loading: true });
    const fetched = await fetch(this.props.jokeUri);
    const json = await fetched.json();
    await sleep(1500); // for demonstration
    const newJoke = json.value.joke;
    this.setState({ joke: newJoke, loading: false });
  }
  render() {
    const { loading, joke } = this.state;
    return (
      <div className={styles.main}>
        <h1>Joke (React, without Redux) </h1>
        <p>
          Demonstrates as simple react module with asynchronous data loading.
          See also the <Link to="/jokeredux">version with redux</Link>.
        </p>
        <JokeDisplay joke={joke} loadingJoke={loading} />
        <Button onClick={() => this.loadJoke()}>Load a new joke</Button>
      </div>
    );
  }
}
