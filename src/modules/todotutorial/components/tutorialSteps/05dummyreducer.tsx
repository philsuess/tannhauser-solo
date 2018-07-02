import React from "react";
import ReactMarkdown from "react-markdown";
import DummyReducer from "./docs/DummyReducer.md";

const dummyreducer = () => <ReactMarkdown source={DummyReducer} />;

export default {
  title: "Dummy Reducer",
  node: dummyreducer
};
