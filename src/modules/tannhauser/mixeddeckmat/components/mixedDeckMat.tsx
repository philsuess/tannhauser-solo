import * as React from 'react';
import * as DeckMat from '../../deckmat';
import * as Model from '../../model';
import Style from '../../stylesheets/main.scss';
import scratchedToken from '../../img/token-scratched.png';
import miaCard from '../../img/cardoverlay-stamp-mia.png';

interface MixedDeckMatProps {
  events: string[];
  characters: string[];
  packs: string[];
  numCharacterCardsBeforeReshuffle: number;
}

interface DeckMatData {
  name: string;
  image: string;
  deck: string[];
  cardIds: string[];
  card_back_image: string;
  extra_text?: any;
}

interface MixedDeckMatState {
  currentDeckIndex: number;
  roundCounter: number;
  roundDecks: DeckMatData[];
  currentCharacter: string;
  charactersActivated: string[];
  charactersDown: string[];
}

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

export default class MixedDeckMat extends React.Component<MixedDeckMatProps,MixedDeckMatState> {
  constructor(props: MixedDeckMatProps) {
    super(props);
    const newDecks = this.constructNewDecks(1);
    this.state = { 
      currentDeckIndex: 0,
      roundCounter: 1,
      roundDecks: newDecks,
      currentCharacter: "",
      charactersActivated: [""],
      charactersDown: [""],
    };
  }

  drawRandomCardFrom(deck: string[]): string {
    const randomCardIndex = randomIntFromInterval(0, deck.length - 1);
    const card = deck.splice(randomCardIndex, 1);
    return card[0];
  }

  getCopiesOfCharacterDecks() {
    return this.props.characters.map(characterKey => Model.AllCharacters[characterKey].deck.slice(0));
  }

  constructNRoundDecksFrom(numRounds: number, decks: string[][]): string[][] {
    const constructedDecks: string[][] = [];
    for (let i = 0; i < numRounds; i=i+1) {
      const constructedDeck: string[] = decks.map(deck => this.drawRandomCardFrom(deck));
      constructedDecks.push(constructedDeck);
    }
    return constructedDecks;
  }

  constructNewDecks(startRoundCounter: number): DeckMatData[] {
    const characterDecks = this.getCopiesOfCharacterDecks();
    const constructedDecks = 
      this.constructNRoundDecksFrom(this.props.numCharacterCardsBeforeReshuffle, characterDecks);
    const roundDecksData: DeckMatData[] = constructedDecks.map((constructedDeck, index) => {
      return {
        name: "Round " + (startRoundCounter + index),
        image: "",
        deck: constructedDeck,
        cardIds: this.props.characters.slice(),
        card_back_image: Model.AllCharacters[this.props.characters[0]].card_back_image,
      }
    });
    return roundDecksData;
  }

  advanceRound() {
    if (this.state.currentDeckIndex === this.props.numCharacterCardsBeforeReshuffle - 1) {
      const newRoundCounter = this.state.roundCounter + this.props.numCharacterCardsBeforeReshuffle;
      const newDecks = this.constructNewDecks(newRoundCounter);
      this.setState({
        currentDeckIndex: 0,
        currentCharacter: "",
        charactersActivated: [""],
        charactersDown: this.state.charactersDown,
        roundCounter: newRoundCounter,
        roundDecks: newDecks,
      });
    }
    else {
      this.setState(prevState => ({ 
        currentDeckIndex: prevState.currentDeckIndex + 1,
        currentCharacter: "",
        charactersActivated: [""],
      }));
    }
  }

  markCharacterDown(characterName: string) {
    this.setState(previousState => ({
      charactersDown: previousState.charactersDown.concat(characterName),
    }));
  }

  markCharacterRevived(characterName: string) {
    const newCharDown = this.state.charactersDown;
    const index = newCharDown.indexOf(characterName, 0);
    if (index > -1) {
      newCharDown.splice(index, 1);
    }
    this.setState(previousState => ({
      charactersDown: newCharDown,
    }));
  }

  getCharacterRoundStatus(isDown: boolean, hasBeenActivated: boolean): string {
    if (isDown) return "Unit is bleeding out"
    
    return hasBeenActivated ? "unit has been actived already this round" : 
      "unit will still activate this round";
  }

  getCharacterHeaderImgClassName(isDown: boolean, hasBeenActivated: boolean): string {
    if (isDown) return Style.THDMheaderImgBleedingOut;

    return hasBeenActivated ? Style.THMDMheaderImgActivated : Style.THMDMheaderImg;
  }

  getCharacterTokenImage(characterName: string, isDown: boolean, hasBeenActivated: boolean) {
    const Player = Model.AllCharacters[characterName];
    const scratchStyle = {
      backgroundImage: `url(${Player.token_image})`,
      backgroundSize: 'cover',
    };
    return isDown ?
      <img className={this.getCharacterHeaderImgClassName(isDown, hasBeenActivated)} 
        src={scratchedToken} style={ scratchStyle }/>
      :
      <img className={this.getCharacterHeaderImgClassName(isDown, hasBeenActivated)} src={Player.token_image} />;
  }

  getCharacterOptions(characterName: string, isDown: boolean) {
    let charStatusOption = <div key={characterName + "ddoptionCharDown"} className={Style.THTeamSelpackSelectOption}
        onClick={(event) => {event.stopPropagation(); this.markCharacterDown(characterName); }}>
          Character down
      </div>;
    if (isDown) {
      charStatusOption = <div key={characterName + "ddoptionCharDown"} className={Style.THTeamSelpackSelectOption} 
        onClick={(event) => {event.stopPropagation(); this.markCharacterRevived(characterName); }}>
          Revive
      </div>;
    }

    return <div key={characterName + "ddcontent"} className={Style.THTeamSeldropdownContent}>
      {charStatusOption}
    </div>
  }

  renderHeader() {
    return this.props.characters.map(characterName => {
      const activated = this.state.charactersActivated.includes(characterName);
      const down = this.state.charactersDown.includes(characterName);
      return <div key={characterName + "div"} >
          <div key={characterName + "img"} className={Style.THTeamSeldropDown} >
            {this.getCharacterTokenImage(characterName, down, activated)}
              {this.getCharacterOptions(characterName, down)}
          </div>
        </div>;
    });
  }

  activateCharacter(characterKey: string) {
    this.setState(previousState => ({
      currentCharacter: characterKey,
      charactersActivated: previousState.charactersActivated.concat(previousState.currentCharacter),
    }));
  }

  renderCurrentCharacterImage() {
    if (this.state.currentCharacter !== "") {
      const image = Model.AllCharacters[this.state.currentCharacter].image;
      return <img src={image} />;
    }
  }

  renderCurrentCharacterPackInfo() {
    const characterKey = this.state.currentCharacter;
    if (characterKey !== "") {
      const characterIndex = this.props.characters.indexOf(characterKey);
      const equippedPack = this.props.packs[characterIndex];
      const inlineStyleForDeckMat = {
        backgroundColor: '#ebeacb',
        color: Model.GetPackColor(equippedPack),
      };
      const packText = equippedPack === "" ? ["No pack selected"] : 
        [
          "Equipped with the ", 
          <span key={characterKey+"style"} style={inlineStyleForDeckMat}><strong>{equippedPack}</strong></span>, 
          " pack",
        ];
      return <h3>{packText}</h3>
    }
  }

  renderCurrentCharacterName() {
    const characterKey = this.state.currentCharacter;
    if (characterKey !== "") {
      return <h2>{Model.AllCharacters[characterKey].name}</h2>
    }
  }

  renderCharacterInfo() {
    return <div className={Style.THMDMCharacterInfo}>
      {this.renderCurrentCharacterImage()}
      {this.renderCurrentCharacterName()}
      {this.renderCurrentCharacterPackInfo()}
    </div>
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

  getCurrentRoundDeck(currentDeckIndex: number) {
    return this.state.roundDecks[currentDeckIndex];
  }

  renderDeckMat() {
    const currentRoundDeck = this.getCurrentRoundDeck(this.state.currentDeckIndex);
    const isCurrenCharacterDown = this.state.charactersDown.includes(this.state.currentCharacter);
    const deckMatProps = {
      ...currentRoundDeck,
      overRideDrawnCard: isCurrenCharacterDown,
      overRideCard: miaCard,
      reshuffleOnEmpty: false,
      emptyDeckClicked: () => this.advanceRound(),
      drawnCard: (cardId: string) => this.activateCharacter(cardId),
    };
    return <div key="Deckmat" className={Style.THMDMcharacterDeck} >
        <div className={Style.THMDMheader}>
          {this.renderHeader()}
        </div>
        <div className={Style.THMDMdeckandInfo}>
          <DeckMat.Component {...deckMatProps} 
            key={this.state.roundCounter*this.props.numCharacterCardsBeforeReshuffle+this.state.currentDeckIndex} />
          {this.renderCharacterInfo()}
        </div>
      </div>;
  }

  renderMat() {
    const mats = this.renderEventMats();
    mats.push(this.renderDeckMat());
    return mats;
  }

  render() {
    return (
      <div className={Style.THMDMmixeddeckmat}>
        {this.renderMat()}
      </div>
    );
  }
}
