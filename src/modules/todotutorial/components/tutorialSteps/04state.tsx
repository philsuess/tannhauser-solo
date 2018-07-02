import React from "react";
import { MarkdownStep } from "./step";
import State from "./docs/State.md";

const state = () => <MarkdownStep source={State} />;

export default {
  title: "State",
  node: state
};
