import * as React from 'react';
import ScrollIntoView from 'react-scroll-into-view';
import * as DeckMat from '../../deckmat';
import * as Model from '../../model';
import Style from '../../stylesheets/main.scss';

interface FactionMatProps {
  events: string[];
  characters: string[];
  packs: string[];
}

export default class FactionMat extends React.Component<FactionMatProps> {

  renderCharacterHeader() {
    return this.props.characters.map(characterName => {
      const Player = Model.AllCharacters[characterName];
      return <div key={characterName}>
          <ScrollIntoView selector={"#" + characterName} >
          <img key={characterName} src={Player.token_image} />
          </ScrollIntoView>
        </div>;
    });
  }

  renderEventsHeader() {
    return this.props.events.map(eventName => {
      const Event = Model.AllEvents[eventName];
      return <div key={eventName}>
          <ScrollIntoView selector={"#" + eventName} >
          <img key={eventName} src={Event.image} />
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
        backgroundColor: '#ebeacb',
        color: Model.GetPackColor(equippedPack),
      };
      const packText = equippedPack === "" ? ["No pack selected"] : 
        [
          "Equipped with the ", 
          <span key={characterName+"style"} style={inlineStyleForDeckMat}><strong>{equippedPack}</strong></span>, 
          " pack",
        ];
      const deckMatProps = {
        ...Player,
        reshuffleOnEmpty: true,
        extra_text: packText,
      };
      return <div className={Style.THFMcharacterDeck} id={characterName} key={characterName + "_matd"} >
        <DeckMat.Component {...deckMatProps} key={characterName + "_mat"} />
        </div>;
    });
  }

  renderEventMats() {
    return this.props.events.map(eventName => {
      const Event = Model.AllEvents[eventName];
      const deckMatProps = {
        ...Event,
        reshuffleOnEmpty: true,
      };
      return <div id={eventName} key={eventName + "_matd"} >
        <DeckMat.Component {...deckMatProps} key={eventName + "_mat"} />
        </div>;
    });
  }

  renderMats() {
    return [this.renderEventMats()].concat(this.renderDeckMats());
  }

  render() {
    return (
      <div className={Style.THFMfactionmat}>
        <div className={Style.THFMheader}>
          {this.renderHeader()}
        </div>
        <div>
          {this.renderMats()}
        </div>
      </div>
    );
  }
}
