import * as React from 'react';
import * as Model from '../../model';
import lazy from '../../img/help/factionMat.gif';
import preferred from "../../img/help/mixedDeckMat.gif";

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
      <div className={"decksetupselection"}>
        <div>
          <h1>Choose how the AI cards should be set up</h1>
          <button 
            className={"thbutton"}
            onClick={() => this.props.selectionComplete(this.state.chosenSetup) }>Select
          </button>
        </div>
        <div className={"selectionOption"}>
        <img 
          className={
            this.state.chosenSetup === Model.DeckSetup.Lazy ? "selected" : "unselected"
          }
          src={lazy}
          onClick={() => this.select(Model.DeckSetup.Lazy)} 
        />
        <h2>Manage character selection and character decks yourself<br/>(aka Dan's "lazy" method)</h2>
        </div>
        <div className={"selectionOption"}>
          <img 
            className={
              this.state.chosenSetup === Model.DeckSetup.Preferred ? "selected" : "unselected"
            }
            src={preferred}
            onClick={() => this.select(Model.DeckSetup.Preferred)} 
          />
          <h2>Mix all characters into round decks, <br/>which will be reshuffled every 5 rounds <br/>
            (aka Dan's "preferred" method)</h2>
        </div>
      </div>
    );
  }
}
