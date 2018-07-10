import * as React from 'react';
import ScrollIntoView from 'react-scroll-into-view';
import FactionMatStyle from '../style.css';
import * as DeckMat from '../../deckmat';
import * as Model from '../../model';

interface FactionMatProps {
  events: string[];
  characters: string[];
  packs: string[];
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

  renderEventsHeader() {
    return this.props.events.map(eventName => {
      const Event = Model.AllEvents[eventName];
      return <div key={eventName}>
          <ScrollIntoView selector={"#" + eventName} >
          <img key={eventName} src={Event.image} height={100} />
          </ScrollIntoView>
        </div>;
    });
  }

  renderHeader() {
    return [this.renderEventsHeader()].concat(this.renderCharacterHeader());
  }

  renderDeckMats() {
    return this.props.characters.map((characterName, index) => {
      const Player = Model.AllCharacters[characterName];
      const equippedPack = this.props.packs[index];
      const inlineStyleForDeckMat = {
        color: Model.GetPackColor(equippedPack),
      };
      const packText = equippedPack === "" ? ["No pack selected"] : 
        ["Equipped with the ", <span style={inlineStyleForDeckMat}>{equippedPack}</span>, " pack"];
      const deckMatProps = {
        ...Player,
        extra_text: packText,
      };
      return <div className={FactionMatStyle.characterDeck} id={characterName} key={characterName + "_matd"} >
        <DeckMat.Component {...deckMatProps} key={characterName + "_mat"} />
        </div>;
    });
  }

  renderEventMats() {
    return this.props.events.map(eventName => {
      const Event = Model.AllEvents[eventName];
      return <div id={eventName} key={eventName + "_matd"} >
        <DeckMat.Component {...Event} key={eventName + "_mat"} />
        </div>;
    });
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
