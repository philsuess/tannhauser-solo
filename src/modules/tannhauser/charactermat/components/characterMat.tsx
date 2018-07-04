import * as React from 'react';
import CharacterMatStyle from '../style.css';
import * as Deck from '../../deck';
import * as MatConstants from '../constants';
import * as Model from '../../model';

interface CharacterMatProps {
  name: string;
  image: string;
  deck: string[];
  card_back_image: string;
}

interface CharacterMatState {
  drawDeck: string[];
  drawnCard: string;
}

function randomIntFromInterval(min: number, max: number)
{
  return Math.floor(Math.random()*(max-min+1)+min);
}

export default class CharacterMat extends React.Component<CharacterMatProps,CharacterMatState> {
  constructor(props: CharacterMatProps) {
    super(props);
    this.state = {
      drawDeck: props.deck.slice(),
      drawnCard: "",
    };
  }

  shuffleAllCardsIntoDeck() {
    this.setState({
      ...this.state,
      drawDeck: this.props.deck.slice(),
      drawnCard: "",
    });
  }

  drawCard() {
    if (this.state.drawDeck.length === 0) {
      this.shuffleAllCardsIntoDeck();
      return;
    }
    const randomCardIndex = randomIntFromInterval(0, this.state.drawDeck.length - 1);
    const draw = this.state.drawDeck[randomCardIndex];
    const newDrawDeck = this.state.drawDeck;
    newDrawDeck.splice(randomCardIndex, 1);
    this.setState({
      ...this.state,
      drawDeck: newDrawDeck,
      drawnCard: draw,
    });
  }

  renderDrawDeck() {
    return (
      <Deck.Components.Deck
        topCardFile={this.props.card_back_image}
        numCards={this.state.drawDeck.length}
        clicked={() => this.drawCard()}
      />
    );
  }

  renderDiscardPile() {
    return (
      <Deck.Components.Deck
        topCardFile={this.state.drawnCard}
        numCards={this.props.deck.length - this.state.drawDeck.length}
        clicked={() => console.log("Discard pile clicked")}
      />
    );
  }

  render() {
    const VariableCharacterMatStyle = {
      height: MatConstants.height,
      width: MatConstants.width,
    };
    return (
      <div className={CharacterMatStyle.charactermat} style={VariableCharacterMatStyle} >
        <div>
          <img src={this.props.image} width={MatConstants.characterImageVidth} />
          <h2>{this.props.name}</h2>
        </div>
        {this.renderDrawDeck()}
        {this.renderDiscardPile()}
      </div>
    );
  }
}
