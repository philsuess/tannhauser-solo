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

interface MainState {
  selectedFaction: string;
  selectedCharacters: string[];
}

export default class Main extends React.Component<MainProps,MainState> {
  constructor(props: MainProps) {
    super(props);
    this.state = {
      selectedFaction: "",
      selectedCharacters: [],
    };
  }

  catchCompleteFactionSelection(faction: string) {
    this.setState({
      ...this.state,
      selectedFaction: faction,
    });
    this.props.selectFaction(faction);
  }

  catchCompleteCharacterSelection(characters: string[]) { 
    this.setState({
      ...this.state,
      selectedCharacters: characters,
    });
    this.props.selectCharacters(characters);
  }

  renderFactionSelection() {
    return <FactionSelection.Component 
              factions={ [Model.Faction.Reich, Model.Faction.Union] } 
              selectionComplete={(selection: string) => this.catchCompleteFactionSelection(selection)}
            />
  }

  renderTeamSelection() {
    return <TeamSelection.Component 
              faction={ Model.StringToFaction(this.state.selectedFaction) }
              characters={Model.AllCharacters}
              selectionComplete={(selection: string[]) => this.catchCompleteCharacterSelection(selection)}
            />
  }

  renderFactionMat() {
    return <FactionMat.Component eventsDeck="Ksiaz" characters={this.state.selectedCharacters} />
  }

  render() {
    let renderComponent = this.renderFactionSelection();
    if (this.state.selectedCharacters.length > 0) renderComponent = this.renderFactionMat();
    else if (this.state.selectedFaction.length > 0) renderComponent = this.renderTeamSelection();
    return (
      <div className={Style.main}>
        { renderComponent }
      </div>
    );
  }
}
