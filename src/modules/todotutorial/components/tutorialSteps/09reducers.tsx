import React from "react";
import ReactMarkdown from "react-markdown";
import Reducers from "./docs/Reducers.md";

export default {
  title: "Reducers",
  node: () => <ReactMarkdown source={Reducers} />,
};
