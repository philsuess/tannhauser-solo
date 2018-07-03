import State from "./state";
import * as joke from "modules/jokereactredux";
import { combineReducers } from "redux";

export default combineReducers<State>({
  [joke.NAME]: joke.reducer,
});
