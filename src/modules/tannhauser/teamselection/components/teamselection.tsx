import * as React from 'react';
import ReactTooltip from 'react-tooltip';
import * as Model from '../../model';
import Style from '../../stylesheets/main.scss';

interface CompleteSelection {
  characters: string[];
  packs: string[];
}

interface TeamSelectionProps {
  faction: Model.Faction;
  characters: Model.Characters;
  selectionComplete: (selection: CompleteSelection) => any;
}

interface SelectionData {
  pack: string;
  selected: boolean;
}

interface TeamSelectionState {
  [characterKey: string]: SelectionData;
}

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

export default class TeamSelectionMat extends React.Component<TeamSelectionProps,TeamSelectionState> {
  constructor(props: TeamSelectionProps) {
    super(props);
    this.resetAllSelections();
  }

  resetAllSelections() {
    let noneSelected = {};
    const unselected: SelectionData = {
      pack: "",
      selected: false,
    };
    this.getFactionKeys().forEach(characterKey => {
      noneSelected = {
        ...noneSelected,
        [characterKey]: unselected,
      }
    });
    this.state = noneSelected;
  }

  select(characterKey: string) {
    this.setState({[characterKey]: { 
      ...this.state[characterKey],
      selected: !this.state[characterKey].selected,
    }});
  }
  
  selectPackFor(characterKey: string, chosenPack: string) {
    this.setState({[characterKey]: { 
      ...this.state[characterKey],
      selected: true,
      pack: chosenPack,
    }});
  }

  isHero(characterKey: string) {
    return this.props.characters[characterKey].type === Model.CharacterType.Hero;
  }

  isSoldier(characterKey: string) {
    return this.props.characters[characterKey].type === Model.CharacterType.Soldier;
  }

  countHeros() {
    let count = 0;
    Object.keys(this.state).forEach(key => {
      if (this.state[key].selected && this.isHero(key)) count = count + 1;
    });
    return count;
  }

  countSoldiers() {
    let count = 0;
    Object.keys(this.state).forEach(key => {
      if (this.state[key].selected && this.isSoldier(key)) count = count + 1;
    });
    return count;
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

  getPacksAsStrings() {
    const packs: string[] = [];
    Object.keys(this.state).forEach(key => {
      const stateEntry = this.state[key];
      if (stateEntry.selected) {
        packs.push(stateEntry.pack);
      }
    });
    return packs;
  }

  getCompleteSelection() {
    return {
      characters: this.getSelectedAsStrings(),
      packs: this.getPacksAsStrings(),
    };
  }

  getFactionKeys() {
    return Object.keys(this.props.characters).filter(key => {
      return this.props.characters[key].faction === this.props.faction;
    });
  }

  selectRandomPackFor(characterKey: string, availablePacks: string[]) {
    const randomPackIndex = randomIntFromInterval(0, availablePacks.length - 1);
    this.selectPackFor(characterKey, availablePacks[randomPackIndex]);
  }

  renderAvailablePacksFor(characterKey: string) {
    const character = this.props.characters[characterKey];
    const availablePacksDivs = Model.GetAvailablePacks(character.type).map(pack => {
      return <div key={character+pack} className={Style.THTeamSelpackSelectOption} 
                onClick={(event) => {event.stopPropagation(); this.selectPackFor(characterKey, pack)}}>
                  {pack} pack
              </div>;
    });
    const packsSelection = availablePacksDivs.concat(
      <div key={characterKey + "randPack"} className={Style.THTeamSelpackSelectOption}
        onClick={(event) => {event.stopPropagation(); 
          this.selectRandomPackFor(characterKey, Model.GetAvailablePacks(character.type))}}>
        Pick randomly
      </div>
    );
    return packsSelection;
  }

  renderPackIndicator(pack: string) {
    const packColor = Model.GetPackColor(pack);
    const tipString = pack === "" ? "no pack selected" : pack + " pack selected";
    const circleStrokeWidth = pack === "" ? 0 : 2;
    return <div data-tip={tipString}>
        <svg width={20} height={20} >
          <circle cx={10} cy={10} r={10} 
            stroke={"grey"} strokeWidth={circleStrokeWidth} fill={packColor} />
        </svg>
        <ReactTooltip place="left" type="dark" effect="float"/>
      </div>
  }

  renderFaction() {
    return this.getFactionKeys().map(key => {
      const char = this.props.characters[key];
      return (
        <div key={key} className={Style.THTeamSelcharacter} >
          <div className={Style.THTeamSeldropDown} onClick={() => this.select(key)} >
            <img src={char.token_image} alt={char.name} 
              className={this.state[key].selected ? Style.THTeamSelselected : Style.THTeamSelunselected} 
            />
            <div className={Style.THTeamSeldropdownContent}>
              {this.renderAvailablePacksFor(key)}
            </div>
          </div>
          <h3>{char.name}</h3>
          {this.renderPackIndicator(this.state[key].pack)}
        </div>
      );
    });
  }

  getCountString() {
    const heroes = this.countHeros();
    const heroPart = heroes === 1 ? "hero" : "heroes";
    const soldiers = this.countSoldiers();
    const soldierPart = soldiers === 1 ? "soldier" : "soldiers";
    const total = this.countSelected();
    return heroes + " " + heroPart + " and " + soldiers + " " + soldierPart + ", " + total + " total selected";
  }

  render() {
    return (
      <div className={Style.THTeamSelteamselection}>
        <div>
          <h2>Select your opponents</h2>
          <h3>({this.getCountString()})</h3>
          <button 
            className={Style.THbutton}
            onClick={() => this.props.selectionComplete(this.getCompleteSelection()) }>Select
          </button>
        </div>
        <div className={Style.THTeamSelcharacters} >{this.renderFaction()}</div>
      </div>
    );
  }
}
