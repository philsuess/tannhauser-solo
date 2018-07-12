import { reducerWithInitialState } from "typescript-fsa-reducers";
import * as actions from "./actions";
import { TannhauserState } from "./model";
import { StaticRouter } from "../../../../node_modules/@types/react-router";

const initialState: TannhauserState = {
  selectedFaction: "",
  selectedCharacters: [],
  selectedEvents: [],
  selectedPacks: [],
  optOutFromEvents: false,
  showHelp: false,
};

export default reducerWithInitialState(initialState)
  .case(actions.selectFaction, (state, payload) => ({
    ...state,
    selectedFaction: payload,
  }))
  .case(actions.selectCharacters, (state, payload) => ({
    ...state,
    selectedCharacters: payload.characters,
    selectedPacks: payload.packs,
  }))
  .case(actions.selectEvents, (state, payload) => ({
    ...state,
    selectedEvents: payload,
  }))
  .case(actions.toggleOptOutFromEvents, (state, payload) => ({
    ...state,
    optOutFromEvents: payload,
  }))
  .case(actions.toggleShowHelp, (state, payload) => ({
    ...state,
    showHelp: payload,
  }));
