import React from "react";
import ReactMarkdown from "react-markdown";

import styles from "../styles.css";
import readme from "README.md";

const boilerplateoverview = () => <ReactMarkdown source={readme} />;

export default {
  title: "Boilerplate",
  node: boilerplateoverview
};
