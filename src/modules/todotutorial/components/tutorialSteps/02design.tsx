import React from "react";
import ReactMarkdown from "react-markdown";
import { Collapse } from "antd";
const { Panel } = Collapse;

import todoState from "./img/todoState.png";
import todoItem from "./img/todoItem.png";
import todoList_interactions from "./img/todoList_interactions.png";
import todoAdd_interactions from "./img/todoAdd_interactions.png";
import design_hand_sketch from "./img/design_hand_sketch.jpg";
import todo_mockup_annotated from "./img/todo_mockup_annotated.png";

import styles from "../styles.css";

const customPanelStyle = {
  background: "#f7f7f7",
  borderRadius: 4,
  marginBottom: 10,
  border: 0
};

const design = () => (
  <div>
    <ReactMarkdown source={designText} />
    <Collapse bordered={false} defaultActiveKey={["1"]}>
      <Panel header="Todo" key="1" style={customPanelStyle}>
        <ReactMarkdown source={todoText} />
      </Panel>
      <Panel header="TodoList" key="2" style={customPanelStyle}>
        <ReactMarkdown source={todoListText} />
      </Panel>
      <Panel header="TodoAdd" key="3" style={customPanelStyle}>
        <ReactMarkdown source={todoAddText} />
      </Panel>
    </Collapse>
  </div>
);

export default {
  title: "Design",
  node: design
};

const designText = `
# The designer in you ...
## Grab pen and paper!

Before we hit the coding stage, let's first get a clear view of our design (at least
what we need for our purposes). Let's assume that you have sketched on paper (or screen)
what you want to see in the end. I can not recommend highly enough doing this step as it
really makes it clear to you how the view will look like, and what actions the view will
allow the user to perform. So, we have sketched a little:

![sketch](${design_hand_sketch})

For the remainder, we'll do this digitally (so there's no more need to get dizzy trying to
decipher my handwriting).

## Naming the components

We name all the component from our initial design document. These
names will determine the names of our components and containers in the code later on.

![todo_mockup](${todo_mockup_annotated})

## Identifying interactions and their states

Next, we take apart all individual components and identify which interactions we will
identify which "states" they must hold. Here we go:
`;

const todoText = `
Since there are no buttons or anything else on that view (interactions will be in TodoList
and TodoAdd), we only have to think about the global state of the application. Obviously, we
need a list of todo items. We want to store with each TodoItem its description (a string) and
whether the item is completed (a boolean). Why not introduce a new type:

![todoitem](${todoItem})

Then the state of the entire application is given by an array of TodoItems, as well as what
is currently in the input of \`TodoAdd\` (why we will keep this in the state will be explained later).

![todoState](${todoState})
`;

const todoListText = `
The TodoList must draw several subitems (as many as there are TodoItems in the state's array) which
each contain a checkbox, the text of the TodoItem, and a button to remove the item. So here are
interactions of TodoList:

![todoList_interactions](${todoList_interactions})

Each item will therefore need to call \`toggle\` and \`delete\` with its array index
as argument.`;

const todoAddText = `
The todo add will update the state every time the user enters something in the input. It is only stored
in the state as \`currentTodoInput\`, but will be used in the creation of a new TodoItem when
the Add button is clicked.

![todoAdd_interactions](${todoAdd_interactions})`;
