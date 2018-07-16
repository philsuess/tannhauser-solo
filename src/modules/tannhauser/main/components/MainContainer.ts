import { connect } from "react-redux";

import Main from "./main";
import * as actions from "../actions";
import { GlobalState } from "../global";

const mapStateToProps = ({ tannhauser }: GlobalState) => ({
  selectedFaction: tannhauser.selectedFaction,
  selectedCharacters: tannhauser.selectedCharacters,
  selectedPacks: tannhauser.selectedPacks,
  selectedEvents: tannhauser.selectedEvents,
  selectedDeckSetup: tannhauser.selectedDeckSetup,
  optOutFromEvents: tannhauser.optOutFromEvents,
  showHelp: tannhauser.showHelp,
});

const mapDispatchToProps = {
  selectFaction: actions.selectFaction,
  selectCharacters: actions.selectCharacters,
  selectEvents: actions.selectEvents,
  toggleOptOutFromEvents: actions.toggleOptOutFromEvents,
  selectDeckSetup: actions.selectDeckSetup,
  toggleShowHelp: actions.toggleShowHelp,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
