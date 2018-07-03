import * as React from 'react';
import FactionMatStyle from '../style.css';
import * as CharacterMat from '../../charactermat';
import * as Model from '../../model';

interface FactionMatProps {
  characters: string[];
}

interface FactionMatState {
  currentCharacter: number;
}

export default class FactionMat extends React.Component<FactionMatProps,FactionMatState> {
  constructor(props: FactionMatProps) {
    super(props);
    this.state = {
      currentCharacter: 0,
    };
  }

  renderHeader() {
    return this.props.characters.map(characterName => {
      const Player = Model.AllCharacters[characterName];
      return <a href={"#" + characterName} ><img key={characterName} src={Player.token_image} height={100} /></a>;
    });
  }

  renderCharacterMats() {
    return this.props.characters.map(characterName => {
      const Player = Model.AllCharacters[characterName];
      return <div id={characterName} ><CharacterMat.Component {...Player} key={characterName + "_mat"} /></div>;
    });
  }

  render() {
    return (
      <div className={FactionMatStyle.factionmat}>
        <div className={FactionMatStyle.header}>
          {this.renderHeader()}
        </div>
        <div>
          {this.renderCharacterMats()}
        </div>
      </div>
    );
  }
}
