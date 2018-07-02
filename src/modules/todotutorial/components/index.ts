import { connect } from "react-redux";
import * as actions from "../actions";
import TodoTutorial from "./TodoTutorial";
import { GlobalState } from "../global";

const mapStateToProps = ({ todotutorial }: GlobalState) => todotutorial;
const mapDispatchToProps = {
  nextStep: actions.nextStep,
  previousStep: actions.previousStep,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoTutorial);
