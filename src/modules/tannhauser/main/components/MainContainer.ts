import { connect } from "react-redux";

import Main from "./main";
import * as actions from "../actions";
import { GlobalState } from "../global";
import { TannhauserState } from "../model";

const mapStateToProps = ({ tannhauser }: GlobalState) => ({
  selectedFaction: tannhauser.selectedFaction,
  selectedCharacters: tannhauser.selectedCharacters,
  selectedPacks: tannhauser.selectedPacks,
  selectedEvents: tannhauser.selectedEvents,
});

const mapDispatchToProps = {
  selectFaction: actions.selectFaction,
  selectCharacters: actions.selectCharacters,
  selectEvents: actions.selectEvents,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
