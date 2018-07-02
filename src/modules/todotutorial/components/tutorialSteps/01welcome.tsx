import React from "react";
import { MarkdownStep } from "./step";
import Welcome from "./docs/Welcome.md";

const welcome = () => <MarkdownStep source={Welcome} />;

export default {
  title: "Welcome",
  node: welcome
};
