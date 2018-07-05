import * as React from 'react';
import Style from '../style.css';
import * as Model from '../../model';

interface TeamSelectionProps {
  faction: Model.Faction;
  characters: Model.Characters;
  selectionComplete: (chosen: string[]) => any;
}

interface TeamSelectionState {
  [key: string] : boolean;
}

export default class TeamSelectionMat extends React.Component<TeamSelectionProps,TeamSelectionState> {
  constructor(props: TeamSelectionProps) {
    super(props);
    this.resetAllSelections();
  }

  resetAllSelections() {
    let noneSelected = {};
    this.getFactionKeys().forEach(key => {
      noneSelected = {
        ...noneSelected,
        [key]: false,
      }
    });
    this.state = noneSelected;
  }

  select(character: string) {
    this.setState({
      ...this.state,
      [character]: !this.state[character],
    });
  }

  countSelected() {
    let selected = 0;
    Object.keys(this.state).forEach(key => {
      if (this.state[key]) selected = selected + 1;
    });
    return selected;
  }

  getSelectedAsStrings() {
    const selected: string[] = [];
    Object.keys(this.state).forEach(key => {
      if (this.state[key]) selected.push(key);
    });
    return selected;
  }

  getFactionKeys() {
    return Object.keys(this.props.characters).filter(key => {
      return this.props.characters[key].faction === this.props.faction;
    });
  }

  renderFaction() {
    return this.getFactionKeys().map(key => {
      const char = this.props.characters[key];
      return (
        <div key={key} className={Style.character} onClick={() => this.select(key)} >
          <img src={char.token_image} alt={char.name} height={100} 
            className={this.state[key] ? Style.selected : Style.unselected} 
          />
          <h3>{char.name}</h3>
        </div>
      );
    });
  }

  render() {
    return (
      <div className={Style.teamselection}>
        <div>
          <h1>Select your opponents ({this.countSelected()} selected)</h1>
          <button onClick={() => this.props.selectionComplete(this.getSelectedAsStrings()) }>Select</button>
        </div>
        <div className={Style.characters} >{this.renderFaction()}</div>
      </div>
    );
  }
}
