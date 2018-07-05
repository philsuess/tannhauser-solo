import State from "./state";
import * as tannhauser from "modules/tannhauser";
import { combineReducers } from "redux";

export default combineReducers<State>({
  [tannhauser.App.NAME]: tannhauser.App.reducer, 
});
