import { actionCreatorFactory } from "typescript-fsa";
import { Dispatch } from "redux";

const createActionCreator = actionCreatorFactory();

export const selectFaction = createActionCreator<string>("SELECT_FACTION");
export const selectCharacters = createActionCreator<string[]>("SELECT_CHARACTERS");
export const selectEvents = createActionCreator<string[]>("SELECT_EVENTS");