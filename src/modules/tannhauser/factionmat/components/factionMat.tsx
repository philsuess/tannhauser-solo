import * as React from 'react';
import FactionMatStyle from '../style.css';
import * as DeckMat from '../../deckmat';
import * as Model from '../../model';

interface FactionMatProps {
  eventsDeck: string;
  characters: string[];
}

interface FactionMatState {
  currentCharacter: number;
}

export default class FactionMat extends React.Component<FactionMatProps,FactionMatState> {
  state = { currentCharacter: 0 };

  renderCharacterHeader() {
    return this.props.characters.map(characterName => {
      const Player = Model.AllCharacters[characterName];
      return <a href={"#" + characterName} ><img key={characterName} src={Player.token_image} height={100} /></a>;
    });
  }

  renderEventHeader() {
    return <img key={'eventImage'} src={Model.AllEvents[this.props.eventsDeck].image} height={100} />
  }

  renderHeader() {
    return [this.renderEventHeader()].concat(this.renderCharacterHeader());
  }

  renderDeckMats() {
    return this.props.characters.map(characterName => {
      const Player = Model.AllCharacters[characterName];
      return <div id={characterName} key={characterName + "_matd"} >
        <DeckMat.Component {...Player} key={characterName + "_mat"} />
        </div>;
    });
  }

  renderEventMats() {
    const Event = Model.AllEvents[this.props.eventsDeck];
    return <DeckMat.Component {...Event} key={Event.name + "_mat"} />
  }

  renderMats() {
    return [this.renderEventMats()].concat(this.renderDeckMats());
  }

  render() {
    return (
      <div className={FactionMatStyle.factionmat}>
        <div className={FactionMatStyle.header}>
          {this.renderHeader()}
        </div>
        <div>
          {this.renderMats()}
        </div>
      </div>
    );
  }
}
