import * as React from 'react';
import { ActionCreator } from "typescript-fsa";
import * as TeamSelection from '../../teamselection';
import * as FactionSelection from '../../factionselection';
import * as FactionMat from '../../factionmat';
import Style from '../style.css';
import * as Model from '../../model';

interface MainProps {
  selectedFaction: string;
  selectedCharacters: string[];
  selectFaction: ActionCreator<string>;
  selectCharacters: ActionCreator<string[]>;
}

export default class Main extends React.Component<MainProps> {
  renderFactionSelection() {
    return <FactionSelection.Component 
              factions={ [Model.Faction.Reich, Model.Faction.Union] } 
              selectionComplete={(selection: string) => this.props.selectFaction(selection)}
            />
  }

  renderTeamSelection() {
    return <TeamSelection.Component 
              faction={ Model.StringToFaction(this.props.selectedFaction) }
              characters={Model.AllCharacters}
              selectionComplete={(selection: string[]) => this.props.selectCharacters(selection)}
            />
  }

  renderFactionMat() {
    return <FactionMat.Component eventsDeck="Ksiaz" characters={this.props.selectedCharacters} />
  }

  render() {
    let renderComponent = this.renderFactionSelection();
    if (this.props.selectedCharacters.length > 0) renderComponent = this.renderFactionMat();
    else if (this.props.selectedFaction.length > 0) renderComponent = this.renderTeamSelection();
    return (
      <div className={Style.main}>
        { renderComponent }
      </div>
    );
  }
}
