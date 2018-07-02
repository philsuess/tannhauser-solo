export interface TodoItem {
  done: boolean;
  text: string;
}

export interface TodoState {
  todos: TodoItem[];
  currentTodoInput: string;
}
export const initialState: TodoState = {
  todos: [],
  currentTodoInput: "",
};
export default TodoState;
