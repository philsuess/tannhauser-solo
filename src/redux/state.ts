import * as todo from "modules/todo";
import * as joke from "modules/jokereactredux";
import * as tutorial from "modules/todotutorial";

export type State = joke.GlobalState & todo.GlobalState & tutorial.GlobalState;
export default State;
