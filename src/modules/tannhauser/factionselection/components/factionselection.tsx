import * as React from 'react';
import classnames from 'classnames';
import * as Model from '../../model';
import reichSymbol from "../../img/reich-symbol.png";
import unionSymbol from "../../img/union-symbol.png";
import daedalusSymbol from "../../img/daedalus-symbol.png";
import Style from '../../stylesheets/main.scss';

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
      <div className={Style.THfactionselection}>
        <div>
          <h1>Select your opponents' faction</h1>
          <button 
            className={Style.THbutton}
            onClick={() => this.props.selectionComplete(this.state.chosenFaction) }>Select
          </button>
        </div>
        <div>
          <img 
            className={
              this.state.chosenFaction === Model.Faction[Model.Faction.Reich] ? 
                Style.THfactionselected : Style.THfactionunselected
            }
            src={reichSymbol}
            onClick={() => this.select(Model.Faction.Reich)} 
          />
          <img 
            className={
              this.state.chosenFaction === Model.Faction[Model.Faction.Union] ? 
                Style.THfactionselected : Style.THfactionunselected
            }
            src={unionSymbol}
            onClick={() => this.select(Model.Faction.Union)} 
          />
          <img 
          className={
            this.state.chosenFaction === Model.Faction[Model.Faction.Daedalus] ? 
              Style.THfactionselected : Style.THfactionunselected
          }
          src={daedalusSymbol}
          onClick={() => this.select(Model.Faction.Daedalus)} 
        />
        </div>
      </div>
    );
  }
}
