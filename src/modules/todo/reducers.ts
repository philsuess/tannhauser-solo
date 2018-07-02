import { Action } from "redux";
import { isType } from "typescript-fsa";

import { addTodo, changeCurrentInput, toggleTodo, deleteTodo } from "./actions";
import { TodoState, TodoItem, initialState } from "./model";

function toggle({ text, done }: TodoItem): TodoItem {
  return { text, done: !done };
}

export default function reducer(state: TodoState, action: Action): TodoState {
  if (!state) {
    return initialState;
  }
  if (isType(action, changeCurrentInput)) {
    return { ...state, currentTodoInput: action.payload };
  }
  if (isType(action, addTodo)) {
    return { ...state, todos: [...state.todos, action.payload] };
  }
  if (isType(action, toggleTodo)) {
    return {
      ...state,
      todos: state.todos.map(
        (item, i) => (i === action.payload ? toggle(item) : item)
      ),
    };
  }
  if (isType(action, deleteTodo)) {
    return {
      ...state,
      todos: state.todos.filter((v, i) => i !== action.payload),
    };
  }
  return state;
}
