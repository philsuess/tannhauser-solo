import * as React from 'react';
import * as style from '../style.css';
import * as DeckConstants from '../constants';
import CardImage from './cardImage';

interface DeckProps {
  num_cards: number;
  top_card_file: string;
  clicked: () => any;
}

function cardStack(num_cards: number, image_file_name: string) { 
  return Array.from(Array(num_cards).keys()).map(index => {
    const z = index + 1;
    const top = index * DeckConstants.cardStackOffset;
    const left = index * DeckConstants.cardStackOffset;
    return <CardImage key={index} source={image_file_name} zIndex={z} top={top} left={left} />
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
        <div className={style.deck} onClick={this.props.clicked}>
          <div className={style.nocard} style={DeckSpaceStyle}>empty</div>
            {cardStack(this.props.num_cards, this.props.top_card_file)}
        </div>
      );
  }
}
