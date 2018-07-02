import React from "react";
import styles from "../styles.css";
import Components from "./docs/Components.md";
import { MarkdownStep } from "./step";

const components = () => <MarkdownStep source={Components} />;

export default {
  title: "Components",
  node: components
};
