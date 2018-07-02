import React from "react";
import ReactMarkdown from "react-markdown";
import Containers from "./docs/Containers.md";

export default {
  node: () => <ReactMarkdown source={Containers} />,
  title: "Containers",
};
