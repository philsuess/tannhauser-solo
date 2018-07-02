import React from "react";
import ReactMarkdown from "react-markdown";
import Router from "./docs/Router.md";

export default {
  title: "Router",
  node: () => <ReactMarkdown source={Router} />,
};
