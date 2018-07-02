import State from "./state";
import * as todo from "modules/todo";
import * as joke from "modules/jokereactredux";
import * as tutorial from "modules/todotutorial";
import { combineReducers } from "redux";

export default combineReducers<State>({
  [todo.NAME]: todo.reducer,
  [joke.NAME]: joke.reducer,
  [tutorial.NAME]: tutorial.reducer,
});
