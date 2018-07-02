import { actionCreatorFactory } from "typescript-fsa";

const createActionCreator = actionCreatorFactory();

export const nextStep = createActionCreator("NEXT_STEP");
export const previousStep = createActionCreator("PREVIOUS_STEP");
