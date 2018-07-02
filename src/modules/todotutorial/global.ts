export const NAME = "todotutorial";
import { TodoTutorialState } from "./model";
export interface GlobalState {
  [NAME]: TodoTutorialState;
}
