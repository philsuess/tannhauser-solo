import React from "react";
import ReactMarkdown from "react-markdown";
import images from "./tutorialImages";

interface MarkdownStepProps {
  source: string;
}
export const MarkdownStep = ({ source }: MarkdownStepProps) => (
  <ReactMarkdown source={source} transformImageUri={img => images[img]} />
);

export interface Step {
  title: string;
  node: React.ReactNode;
}
