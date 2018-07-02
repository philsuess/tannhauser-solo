import * as React from "react";
import TodoListContainer from "./TodoListContainer";
import AddTodoContainer from "./TodoAddContainer";
import styles from "./styles.css";

export default () => (
  <div className={styles.main}>
    <TodoListContainer />
    <AddTodoContainer />
  </div>
);
