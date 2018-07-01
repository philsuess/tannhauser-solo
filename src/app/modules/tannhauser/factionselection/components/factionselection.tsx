import * as React from 'react';
import * as Style from '../style.css';
import * as Model from '../../model';

interface FactionSelectionProps {
  factions: Model.Faction[];
  selectionComplete: (chosen: string) => any;
}

interface FactionSelectionState {
  chosenFaction: string;
}

export default class FactionSelection extends React.Component<FactionSelectionProps,FactionSelectionState> {
  constructor(props: FactionSelectionProps) {
    super(props);
    this.state = { chosenFaction: "" };
  }

  select(faction: Model.Faction) {
    this.setState({
      ...this.state,
      chosenFaction: Model.Faction[faction],
    });
  }

  render() {
    return (
      <div className={Style.factionselection}>
        <div>
          <h1>Select your opponents' faction</h1>
          <button onClick={() => this.props.selectionComplete(this.state.chosenFaction) }>Select</button>
        </div>
        <div>
          <img 
            className={this.state.chosenFaction === Model.Faction[Model.Faction.Reich] ? Style.selected : Style.unselected}
            src="app/modules/tannhauser/img/reich-symbol.png"
            onClick={() => this.select(Model.Faction.Reich)} 
          />
          <img 
            className={this.state.chosenFaction === Model.Faction[Model.Faction.Union] ? Style.selected : Style.unselected}
            src="app/modules/tannhauser/img/union-symbol.png" 
            onClick={() => this.select(Model.Faction.Union)} />
        </div>
      </div>
    );
  }
}
