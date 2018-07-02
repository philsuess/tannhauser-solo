import { reducerWithInitialState } from "typescript-fsa-reducers";
import * as actions from "./actions";
import { TodoTutorialState } from "./model";

const initialState: TodoTutorialState = {
  currentStep: 0,
  totalNumSteps: 10,
};

export default reducerWithInitialState(initialState)
  .case(actions.nextStep, state => ({
    ...state,
    currentStep: state.currentStep + 1,
  }))
  .case(actions.previousStep, state => ({
    ...state,
    currentStep: state.currentStep - 1,
  }));
