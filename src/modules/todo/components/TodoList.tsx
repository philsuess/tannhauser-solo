import * as React from "react";
import { List, Button } from "antd";
import { TodoItem } from "../model";
import TodoListItem from "./TodoListItem";

interface Props {
  todos: TodoItem[];
  toggleTodo: (index: number) => void;
  deleteTodo: (index: number) => void;
}

export default ({ todos, toggleTodo, deleteTodo }: Props) => (
  <List
    bordered
    header="List of Todos"
    dataSource={todos}
    renderItem={(item: TodoItem, i: number) => (
      <TodoListItem
        item={item}
        toggle={() => toggleTodo(i)}
        remove={() => deleteTodo(i)}
      />
    )}
  />
);
