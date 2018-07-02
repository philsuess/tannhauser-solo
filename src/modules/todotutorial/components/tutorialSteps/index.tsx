import React from "react";

import Welcome from "./01welcome";
import Design from "./02design";
import Boilerplate from "./03boilerplate";
import State from "./04state";
import DummyReducer from "./05dummyreducer";
import Components from "./06components";
import Actions from "./07actions";
import Containers from "./08containers";
import Reducers from "./09reducers";
import Router from "./10router";

export const totalNumSteps = 10;

export const getTutorialStepHeader = (step: number) => {
  switch (step) {
    case 0:
      return Welcome.title;
    case 1:
      return Design.title;
    case 2:
      return Boilerplate.title;
    case 3:
      return State.title;
    case 4:
      return DummyReducer.title;
    case 5:
      return Components.title;
    case 6:
      return Actions.title;
    case 7:
      return Containers.title;
    case 8:
      return Reducers.title;
    case 9:
      return Router.title;
    default:
      return "Welcome";
  }
};

export const getTutorialStep = (step: number) => {
  switch (step) {
    case 0:
      return <Welcome.node />;
    case 1:
      return <Design.node />;
    case 2:
      return <Boilerplate.node />;
    case 3:
      return <State.node />;
    case 4:
      return <DummyReducer.node />;
    case 5:
      return <Components.node />;
    case 6:
      return <Actions.node />;
    case 7:
      return <Containers.node />;
    case 8:
      return <Reducers.node />;
    case 9:
      return <Router.node />;
    default:
      return <Welcome.node />;
  }
};

export default getTutorialStep;
