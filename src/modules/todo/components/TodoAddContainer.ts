import { connect } from "react-redux";

import AddTodo from "./TodoAdd";
import { changeCurrentInput, addTodo } from "../actions";
import { NAME, GlobalState } from "../global";
import { TodoState } from "../model";

const mapStateToProps = ({ todo }: GlobalState) => ({
  currentTodoInput: todo.currentTodoInput,
});
const mapDispatchToProps = {
  changeCurrentInput,
  addTodo: (text: string, done?: boolean) => addTodo({ text, done: !!done }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTodo);
