import React from "react";
import ReactMarkdown from "react-markdown";
import Actions from "./docs/Actions.md";

const actions = () => <ReactMarkdown source={Actions} />;

export default {
  title: "Actions",
  node: actions,
};
