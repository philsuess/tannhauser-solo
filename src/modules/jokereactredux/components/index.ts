import { connect } from "react-redux";
import { GlobalState, NAME } from "../global";
import * as actions from "../actions";
import Joke from "./Joke";

interface OwnProps {
  jokesUri: string;
}

const mapStateToProps = ({ reactreduxjoke }: GlobalState, own: OwnProps) => ({
  jokesUri: own.jokesUri,
  joke: reactreduxjoke.joke,
  loadingJoke: reactreduxjoke.loadingJoke,
});

const mapDispatchToProps = {
  loadJoke: actions.requestJoke,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Joke);
