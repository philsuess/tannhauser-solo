import * as React from 'react';
import Style from '../style.scss';
import THStyle from '../../main/style.scss';
import * as Model from '../../model';
import reichSymbol from "../../img/reich-symbol.png";
import unionSymbol from "../../img/union-symbol.png";
import daedalusSymbol from "../../img/daedalus-symbol.png";

interface FactionSelectionProps {
  factions: Model.Faction[];
  selectionComplete: (chosen: string) => any;
}

interface FactionSelectionState {
  chosenFaction: string;
}

export default class FactionSelection extends React.Component<FactionSelectionProps,FactionSelectionState> {
  state = { chosenFaction: "" };

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
          <button 
            className={THStyle.thbutton}
            onClick={() => this.props.selectionComplete(this.state.chosenFaction) }>Select
          </button>
        </div>
        <div>
          <img 
            className={
              this.state.chosenFaction === Model.Faction[Model.Faction.Reich] ? Style.selected : Style.unselected
            }
            src={reichSymbol}
            onClick={() => this.select(Model.Faction.Reich)} 
          />
          <img 
            className={
              this.state.chosenFaction === Model.Faction[Model.Faction.Union] ? Style.selected : Style.unselected
            }
            src={unionSymbol}
            onClick={() => this.select(Model.Faction.Union)} 
          />
          <img 
          className={
            this.state.chosenFaction === Model.Faction[Model.Faction.Daedalus] ? Style.selected : Style.unselected
          }
          src={daedalusSymbol}
          onClick={() => this.select(Model.Faction.Daedalus)} 
        />
        </div>
      </div>
    );
  }
}
