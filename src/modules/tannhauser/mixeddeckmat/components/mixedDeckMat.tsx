import * as React from 'react';
import MixedDeckMatStyle from '../style.css';
import * as DeckMat from '../../deckmat';
import * as Model from '../../model';

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

  renderHeader() {
    return this.props.characters.map(characterName => {
      const Player = Model.AllCharacters[characterName];
      const activated = this.state.charactersActivated.includes(characterName);
      return <div key={characterName} 
        className={activated ? MixedDeckMatStyle.headerImgActivated : MixedDeckMatStyle.headerImg}>
          <img key={characterName} src={Player.token_image} height={100} />
        </div>;
    });
  }

  activateCharacter(characterKey: string) {
    this.setState(previousState => ({
      currentCharacter: characterKey,
      charactersActivated: previousState.charactersActivated.concat(previousState.currentCharacter),
    }));
  }

  renderDeckMat() {
    const deckMatProps = {
      ...this.state.roundDecks[this.state.currentDeckIndex],
      reshuffleOnEmpty: false,
      emptyDeckClicked: () => this.advanceRound(),
      drawnCard: (cardId: string) => this.activateCharacter(cardId),
    };
    return <div className={MixedDeckMatStyle.characterDeck} >
        <DeckMat.Component {...deckMatProps} 
          key={this.state.roundCounter*this.props.numCharacterCardsBeforeReshuffle+this.state.currentDeckIndex} />
      </div>;
  }

  renderCurrentCharacterImage() {
    if (this.state.currentCharacter !== "") {
      const image = Model.AllCharacters[this.state.currentCharacter].image;
      return <img src={image} width={250} height={450} />;
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
    return <div>
      {this.renderCurrentCharacterImage()}
      {this.renderCurrentCharacterName()}
      {this.renderCurrentCharacterPackInfo()}
    </div>
  }

  renderMat() {
    return this.renderDeckMat();
  }

  render() {
    return (
      <div className={MixedDeckMatStyle.mixeddeckmat}>
        <div className={MixedDeckMatStyle.header}>
          {this.renderHeader()}
        </div>
        <div className={MixedDeckMatStyle.characterDeck}>
          {this.renderMat()}
          {this.renderCharacterInfo()}
        </div>
      </div>
    );
  }
}
