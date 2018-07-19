import * as React from 'react';
import * as DeckConstants from '../constants';
import CardImage from './cardImage';
import Style from '../../stylesheets/main.scss';

interface DeckProps {
  numCards: number;
  topCardFile: string;
  clicked: () => any;
}

function cardStack(numCards: number, imageFileName: string) {
  const numCardstoRender = Math.min(DeckConstants.maxCardsInDeck, numCards);
  return Array.from(Array(numCardstoRender).keys()).map(index => {
    const z = index + 1;
    const top = index * DeckConstants.cardStackOffset;
    const left = index * DeckConstants.cardStackOffset;
    return <CardImage key={index} source={imageFileName} zIndex={z} top={top} left={left} />
  });
}

export default class Deck extends React.Component<DeckProps> {

  render() {
    const DeckSpaceStyle = {
      zIndex: 0,
      height: DeckConstants.maxDeckHeight,
      width: DeckConstants.maxDeckWidth,
    };
    return (
        <div className={Style.THdeck} onClick={this.props.clicked}>
          <div className={Style.THnocard} style={DeckSpaceStyle}>empty</div>
            {cardStack(this.props.numCards, this.props.topCardFile)}
        </div>
      );
  }
}
