import * as React from "react";
import { Input, Button } from "antd";
import { TodoItem } from "../model";
import styles from "./styles.css";
import { ActionCreator } from "typescript-fsa";

interface Props {
  addTodo: (text: string, done?: boolean) => any;
  changeCurrentInput: ActionCreator<string>;
  currentTodoInput: string;
}

export default class AddTodo extends React.Component<Props> {
  onAdd() {
    const { currentTodoInput, addTodo, changeCurrentInput } = this.props;
    addTodo(currentTodoInput);
    changeCurrentInput("");
  }

  render() {
    const { addTodo, currentTodoInput, changeCurrentInput } = this.props;
    return (
      <div className={styles.todoInput}>
        <Input
          placeholder="enter todo"
          value={currentTodoInput}
          onChange={e => changeCurrentInput(e.target.value)}
          onPressEnter={() => this.onAdd()}
        />
        <Button type="primary" onClick={() => this.onAdd()}>
          Add
        </Button>
      </div>
    );
  }
}
