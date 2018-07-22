import * as React from 'react';
import * as Model from '../../model';
import lazy from '../../img/help/factionMat.gif';
import preferred from "../../img/help/mixedDeckMat.gif";
import Style from '../../stylesheets/main.scss';

interface DeckSetupSelectionProps {
  selectionComplete: (chosen: Model.DeckSetup) => any;
}

interface DeckSetupSelectionState {
  chosenSetup: Model.DeckSetup;
}

export default class DeckSetupSelection extends React.Component<DeckSetupSelectionProps,DeckSetupSelectionState> {
  state = { chosenSetup: Model.DeckSetup.NoneSelected };

  select(setup: Model.DeckSetup) {
    this.setState({ chosenSetup: setup });
  }

  render() {
    return (
      <div className={Style.THDSSdecksetupselection}>
        <div>
          <h2>Choose how the AI cards should be set up</h2>
          <button 
            hidden={true}
            className={Style.THbutton}
            onClick={() => this.props.selectionComplete(this.state.chosenSetup) }>Select
          </button>
        </div>
        <div className={Style.THDSSselectionOption}>
        <img 
          className={
            this.state.chosenSetup === Model.DeckSetup.Lazy ? Style.THDSSselected : Style.THDSSunselected
          }
          src={lazy}
          onClick={() => this.props.selectionComplete(Model.DeckSetup.Lazy) } 
        />
        <h3>Manage character selection and character decks yourself<br/>(aka Dan's "lazy" method)</h3>
        </div>
        <div className={Style.THDSSselectionOption}>
          <img 
            className={
              this.state.chosenSetup === Model.DeckSetup.Preferred ? Style.THDSSselected : Style.THDSSunselected
            }
            src={preferred}
            onClick={() => this.props.selectionComplete(Model.DeckSetup.Preferred) } 
          />
          <h3>Mix all characters into round decks, <br/>which will be reshuffled every 5 rounds <br/>
            (aka Dan's "preferred" method)</h3>
        </div>
      </div>
    );
  }
}
