import { actionCreatorFactory } from "typescript-fsa";
import { TodoItem } from "./model";

const createActionCreator = actionCreatorFactory();

export const addTodo = createActionCreator<TodoItem>("TODO_ADD");
export const changeCurrentInput = createActionCreator<string>(
  "CURRENT_INPUT_CHANGED"
);
export const toggleTodo = createActionCreator<number>("TODO_TOGGLE");
export const deleteTodo = createActionCreator<number>("TODO_DELETE");
