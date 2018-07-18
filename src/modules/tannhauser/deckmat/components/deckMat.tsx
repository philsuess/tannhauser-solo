import * as React from 'react';
import '../../stylesheets/main.scss';
import * as Deck from '../../deck';
import * as MatConstants from '../constants';

interface DeckMatProps {
  name: string;
  image: string;
  deck: string[];
  cardIds?: string[];
  card_back_image: string;
  reshuffleOnEmpty: boolean;
  extra_text?: any;
  emptyDeckClicked?: () => any;
  drawnCard?: (cardId: string) => any;
}

interface DeckMatState {
  drawDeck: string[];
  remainingCardIds: string[];
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
      remainingCardIds: props.cardIds ? props.cardIds.slice() : [],
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

  callBackEmptyDeckPileClicked() {
    this.props.emptyDeckClicked && this.props.emptyDeckClicked();
  }

  updateArray(listToUpdate: string[], indexToSplice: number) {
    const newList = listToUpdate;
    newList.splice(indexToSplice, 1);
    return newList;
  }

  drawCard() {
    if (this.state.drawDeck.length === 0) {
      if (this.props.reshuffleOnEmpty) this.shuffleAllCardsIntoDeck();
      this.callBackEmptyDeckPileClicked();
      return;
    }
    const randomCardIndex = randomIntFromInterval(0, this.state.drawDeck.length - 1);
    const draw = this.state.drawDeck[randomCardIndex];
    const newDrawDeck = this.updateArray(this.state.drawDeck, randomCardIndex);
    this.setState({
      ...this.state,
      drawDeck: newDrawDeck,
      drawnCard: draw,
    });
    if (this.props.drawnCard) {
      if (this.props.cardIds) {
        this.props.drawnCard(this.state.remainingCardIds[randomCardIndex]);
        const newRemainingIds = this.updateArray(this.state.remainingCardIds, randomCardIndex);
        this.setState({remainingCardIds: newRemainingIds});
      }
      else this.props.drawnCard("card drawn");
    }
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
      <div className={'th-deckmat'} style={VariableDeckMatStyle} >
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
