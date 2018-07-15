import * as React from 'react';
import MixedDeckMatStyle from '../style.css';
import * as DeckMat from '../../deckmat';
import * as Model from '../../model';

interface MixedDeckMatProps {
  events: string[];
  characters: string[];
  packs: string[];
}

interface DeckMatData {
  name: string;
  image: string;
  deck: string[];
  card_back_image: string;
  extra_text?: any;
}

interface MixedDeckMatState {
  currentCard: string;
  roundCounter: number;
  roundDecks: DeckMatData[];
}

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

export default class MixedDeckMat extends React.Component<MixedDeckMatProps,MixedDeckMatState> {
  constructor(props: MixedDeckMatProps) {
    super(props);
    this.state = { 
      currentCard: "",
      roundCounter: 0,
      roundDecks: [{
        name: "Round 0",
        image: "",
        deck: [""],
        card_back_image: "",
      }],
    };
    this.constructNewDecks();
  }

  drawRandomCardFrom(deck: string[]): string {
    const randomCardIndex = randomIntFromInterval(0, deck.length);
    const card = deck.splice(randomCardIndex, 1);
    return card[0];
  }

  getCopiesOfCharacterDecks() {
    return this.props.characters.map(characterKey => Model.AllCharacters[characterKey].deck.splice(0));
  }

  constructNRoundDecksFrom(numRounds: number, decks: string[][]) {
    const constructedDecks: string[][] = [];
    for (let i = 0; i < numRounds; i++) {
      const constructedDeck: string[] = decks.map(deck => this.drawRandomCardFrom(deck));
      constructedDecks.push(constructedDeck);
    }
    return constructedDecks;
  }

  constructNewDecks() {
    const characterDecks = this.getCopiesOfCharacterDecks();
    const constructedDecks = this.constructNRoundDecksFrom(5, characterDecks);
    const roundDecksData: DeckMatData[] = constructedDecks.map((constructedDeck, index) => {
      return {
        name: "Round " + (this.state.roundCounter + index),
        image: "",
        deck: constructedDeck,
        card_back_image: Model.AllCharacters[this.props.characters[0]].card_back_image,
      }
    });
    this.state = ({
      ...this.state,
      roundDecks: roundDecksData,
    });
  }

  advanceRound() {
    this.state = ({
      ...this.state,
      roundCounter: this.state.roundCounter + 1,
    });
  }

  renderHeader() {
    return this.props.characters.map(characterName => {
      const Player = Model.AllCharacters[characterName];
      return <div key={characterName}>
          <img key={characterName} src={Player.token_image} height={100} />
        </div>;
    });
  }

  renderDeckMat() {
    if (this.state.roundCounter % 5) this.constructNewDecks();
    const useDeckIndex = (this.state.roundCounter / 5) % 5;
    return <div className={MixedDeckMatStyle.characterDeck} >
        <DeckMat.Component {...this.state.roundDecks[useDeckIndex]} />
      </div>;
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
        <div>
          {this.renderMat()}
        </div>
      </div>
    );
  }
}
