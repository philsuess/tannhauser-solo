import { reducerWithInitialState } from "typescript-fsa-reducers";
import * as actions from "./actions";
import { ReactReduxJokeState } from "./model";

const initialState: ReactReduxJokeState = {
  joke: "no joke loaded",
  loadingJoke: false,
};

export default reducerWithInitialState(initialState)
  .case(actions.loadJoke.done, (state, { result }) => ({
    ...state,
    joke: result.joke,
    loadingJoke: false,
  }))
  .case(actions.loadJoke.started, (state, payload) => ({
    ...state,
    loadingJoke: true,
  }))
  .case(actions.loadJoke.failed, (state, { params, error }) => ({
    ...state,
    joke: `Failed to load joke from '${params.jokeUri}': ${error}`,
    loadingJoke: false,
  }));
