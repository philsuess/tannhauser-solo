import * as React from 'react';
import ScrollIntoView from 'react-scroll-into-view';
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
      return <div key={characterName}>
          <ScrollIntoView selector={"#" + characterName} >
          <img key={characterName} src={Player.token_image} height={100} />
          </ScrollIntoView>
        </div>;
    });
  }

  renderEventHeader() {
    return <div key={'eventImage'}>
        <ScrollIntoView selector={"#event"} >
        <img key={'eventImage'} src={Model.AllEvents[this.props.eventsDeck].image} height={100} />
        </ScrollIntoView>
      </div>;
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
    return <div id={"event"} key={"event"} >
        <DeckMat.Component {...Event} key={Event.name + "_mat"} />
      </div>;
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
