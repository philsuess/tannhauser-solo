import * as React from 'react';
import DeckMatStyle from '../style.css';
import * as Deck from '../../deck';
import * as MatConstants from '../constants';

interface DeckMatProps {
  name: string;
  image: string;
  deck: string[];
  card_back_image: string;
  reshuffleOnEmpty: boolean;
  extra_text?: any;
}

interface DeckMatState {
  drawDeck: string[];
  drawnCard: string;
}

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

export default class DeckMat extends React.Component<DeckMatProps,DeckMatState> {
  constructor(props: DeckMatProps) {
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
      if (this.props.reshuffleOnEmpty) this.shuffleAllCardsIntoDeck();
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
    const VariableDeckMatStyle = {
      height: MatConstants.height,
      width: MatConstants.width,
    };
    return (
      <div className={DeckMatStyle.deckmat} style={VariableDeckMatStyle} >
        <div>
          <img src={this.props.image} width={MatConstants.deckImageVidth} />
          <h2>{this.props.name}</h2>
          <h3>({this.state.drawDeck.length} cards left)</h3>
        </div>
        {this.renderDrawDeck()}
        {this.renderDiscardPile()}
        {(this.props.extra_text != null) && <h3>{this.props.extra_text}</h3>}
      </div>
    );
  }
}
