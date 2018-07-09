import * as React from 'react';
import Style from '../style.css';
import * as Model from '../../model';

interface TeamSelectionProps {
  faction: Model.Faction;
  characters: Model.Characters;
  selectionComplete: (chosen: string[]) => any;
}

interface TeamSelectionState {
  [key: string]: {
    selected: boolean,
    pack: string,
  };
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
        [key]: {
          selected: false,
          pack: "",
        }
      }
    });
    this.state = noneSelected;
  }

  select(characterKey: string) {
    this.setState({
      ...this.state,
      [characterKey]: {
        ...this.state[characterKey],
        selected: !this.state[characterKey].selected,
      },
    });
  }

  countSelected() {
    let count = 0;
    Object.keys(this.state).forEach(key => {
      if (this.state[key].selected) count = count + 1;
    });
    return count;
  }

  getSelectedAsStrings() {
    const chosen: string[] = [];
    Object.keys(this.state).forEach(key => {
      if (this.state[key].selected) chosen.push(key);
    });
    return chosen;
  }

  getFactionKeys() {
    return Object.keys(this.props.characters).filter(key => {
      return this.props.characters[key].faction === this.props.faction;
    });
  }

  selectPackFor(characterKey: string, pack: string) {
    this.setState({
      ...this.state,
      [characterKey]: {
        ...this.state[characterKey],
        selected: true,
        pack: pack,
      },
    });
  }

  renderAvailablePacksFor(characterKey: string) {
    const character = this.props.characters[characterKey];
    return Model.GetAvailablePacks(character.type).map(pack => {
      return <div key={character+pack} className={Style.packSelectOption} onClick={() => this.selectPackFor(characterKey, pack)}>
        {pack} pack</div>;
    });
  }

  renderFaction() {
    return this.getFactionKeys().map(key => {
      const char = this.props.characters[key];
      return (
        <div key={key}>
          <div className={Style.character} onClick={() => this.select(key)} >
            <img src={char.token_image} alt={char.name} height={100} 
              className={this.state[key].selected ? Style.selected : Style.unselected} 
            />
            <h3>{char.name}</h3>
            <div className={Style.dropdownContent}>
              {this.renderAvailablePacksFor(key)}
            </div>
          </div>
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
