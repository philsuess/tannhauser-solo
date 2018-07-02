import * as React from 'react';
import * as TeamSelection from '../../teamselection';
import * as FactionSelection from '../../factionselection';
import * as FactionMat from '../../factionmat';
import * as Style from '../style.css';
import * as Model from '../../model';

interface MainProps {
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
  }

  catchCompleteCharacterSelection(characters: string[]) { 
    this.setState({
      ...this.state,
      selectedCharacters: characters,
    });
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
    return <FactionMat.Component characters={this.state.selectedCharacters} />
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
