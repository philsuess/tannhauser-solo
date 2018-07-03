import * as React from 'react';
import DeckStyle from '../style.css';
import * as DeckConstants from '../constants';

interface cardImageProps {
  source: string;
  zIndex: number;
  top: number;
  left: number;
}

const CardImage = function statelessFunctionComponentClass(props: cardImageProps) {
  const style = {
    zIndex: props.zIndex,
    top: props.top,
    left: props.left,
  };

  return (
    <div className={DeckStyle.card} style={style}>
      <img src={props.source} height={DeckConstants.cardHeight} />
    </div>
  );
};

export default CardImage;