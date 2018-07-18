import * as React from 'react';
import '../../stylesheets/main.scss';
import * as DeckConstants from '../constants';

interface cardImageProps {
  source: string;
  zIndex: number;
  top: number;
  left: number;
}

const CardImage = function statelessFunctionComponentClass(props: cardImageProps) {
  const inlineStyle = {
    zIndex: props.zIndex,
    top: props.top,
    left: props.left,
  };

  return (
    <div className={'th-card'} style={inlineStyle}>
      <img src={props.source} height={DeckConstants.cardHeight} />
    </div>
  );
};

export default CardImage;