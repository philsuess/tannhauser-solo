import * as React from 'react';
import CharacterMatStyle from '../style.css';
import * as Deck from '../../deck';
import * as MatConstants from '../constants';
import * as Model from '../../model';

interface CharacterMatState {
  draw_deck: string[];
  drawn_card: string;
}

function randomIntFromInterval(min: number, max: number)
{
  return Math.floor(Math.random()*(max-min+1)+min);
}

export default class CharacterMat extends React.Component<Model.CharacterData,CharacterMatState> {
  constructor(props: Model.CharacterData) {
    super(props);
    this.state = {
      draw_deck: props.deck.slice(),
      drawn_card: "",
    };
  }

  shuffleAllCardsIntoDeck() {
    this.setState({
      ...this.state,
      draw_deck: this.props.deck.slice(),
      drawn_card: "",
    });
  }

  drawCard() {
    if (this.state.draw_deck.length === 0) {
      this.shuffleAllCardsIntoDeck();
      return;
    }
    const randomCardIndex = randomIntFromInterval(0, this.state.draw_deck.length - 1);
    const draw = this.state.draw_deck[randomCardIndex];
    const newDrawDeck = this.state.draw_deck;
    newDrawDeck.splice(randomCardIndex, 1);
    this.setState({
      ...this.state,
      draw_deck: newDrawDeck,
      drawn_card: draw,
    });
  }

  renderDrawDeck() {
    return (
      <Deck.Components.Deck
        top_card_file={this.props.card_back_image}
        num_cards={this.state.draw_deck.length}
        clicked={() => this.drawCard()}
      />
    );
  }

  renderDiscardPile() {
    return (
      <Deck.Components.Deck
        top_card_file={this.state.drawn_card}
        num_cards={this.props.deck.length - this.state.draw_deck.length}
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
