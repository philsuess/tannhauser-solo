import TodoState from "./model";
export const NAME = "todo";
// we assume that the global state contains this module's state under the name 'todo'
// this is necessary for the redux containers to work properly
export interface GlobalState {
  [NAME]: TodoState;
}
