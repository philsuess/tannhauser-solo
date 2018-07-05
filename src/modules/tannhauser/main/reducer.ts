import { reducerWithInitialState } from "typescript-fsa-reducers";
import * as actions from "./actions";
import { TannhauserState } from "./model";

const initialState: TannhauserState = {
  selectedFaction: "",
  selectedCharacters: [],
};

export default reducerWithInitialState(initialState)
  .case(actions.selectFaction, (state, payload) => ({
    ...state,
    selectedFaction: payload,
  }))
  .case(actions.selectCharacters, (state, payload) => ({
    ...state,
    selectedCharacters: payload,
  }));
