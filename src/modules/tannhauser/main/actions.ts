import { actionCreatorFactory } from "typescript-fsa";
import { Dispatch } from "redux";
import { bool } from "prop-types";

const createActionCreator = actionCreatorFactory();

export const selectFaction = createActionCreator<string>("SELECT_FACTION");
export const selectCharacters = createActionCreator<{characters: string[], packs: string[]}>("SELECT_CHARACTERS");
export const selectEvents = createActionCreator<string[]>("SELECT_EVENTS");
export const toggleOptOutFromEvents = createActionCreator<boolean>("OPTOUTFROMEVENTS");
export const toggleShowHelp = createActionCreator<boolean>("SHOW_HELP");