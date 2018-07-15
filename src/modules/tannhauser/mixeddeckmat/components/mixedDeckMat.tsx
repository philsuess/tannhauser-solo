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
  currentDeckIndex: number;
  roundCounter: number;
  roundDecks: DeckMatData[];
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
      roundCounter: 0,
      roundDecks: newDecks,
    };
  }

  drawRandomCardFrom(deck: string[]): string {
    const randomCardIndex = randomIntFromInterval(0, deck.length - 1);
    const card = deck.splice(randomCardIndex, 1);
    return card[0];
  }

  getCopiesOfCharacterDecks() {
    return this.props.characters.map(characterKey => Model.AllCharacters[characterKey].deck.splice(0));
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
    const constructedDecks = this.constructNRoundDecksFrom(5, characterDecks);
    const roundDecksData: DeckMatData[] = constructedDecks.map((constructedDeck, index) => {
      return {
        name: "Round " + (startRoundCounter + index),
        image: "",
        deck: constructedDeck,
        card_back_image: Model.AllCharacters[this.props.characters[0]].card_back_image,
      }
    });
    return roundDecksData;
  }

  advanceRound() {
    if (this.state.currentDeckIndex === 5) {
      const newDecks = this.constructNewDecks(this.state.roundCounter + 1);
      this.setState(prevState => ({
        currentDeckIndex: 0,
        roundCounter: prevState.roundCounter + 5,
        roundDecks: newDecks,
      }));
    }
    else {
      this.setState(prevState => ({ 
        currentDeckIndex: prevState.currentDeckIndex + 1,
      }));
    }
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
    const deckMatProps = {
      ...this.state.roundDecks[this.state.currentDeckIndex],
      reshuffleOnEmpty: false,
      emptyDeckClicked: () => this.advanceRound(),
    };
    return <div className={MixedDeckMatStyle.characterDeck} >
        <DeckMat.Component {...deckMatProps} />
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
