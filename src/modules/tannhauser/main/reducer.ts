import { reducerWithInitialState } from "typescript-fsa-reducers";
import * as actions from "./actions";
import { TannhauserState } from "./model";

const initialState: TannhauserState = {
  selectedFaction: "",
  selectedCharacters: [],
  selectedEvents: [],
};

export default reducerWithInitialState(initialState)
  .case(actions.selectFaction, (state, payload) => ({
    ...state,
    selectedFaction: payload,
  }))
  .case(actions.selectCharacters, (state, payload) => ({
    ...state,
    selectedCharacters: payload,
  }))
  .case(actions.selectEvents, (state, payload) => ({
    ...state,
    selectedEvents: payload,
  }));
