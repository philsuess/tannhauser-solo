import { connect } from "react-redux";

import TodoList from "./TodoList";
import { GlobalState } from "../global";
import { toggleTodo, deleteTodo } from "../actions";

const mapStateToProps = ({ todo }: GlobalState) => ({ todos: todo.todos });
const mapDispatchToProps = { toggleTodo, deleteTodo };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
