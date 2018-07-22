import * as React from 'react';
import Style from '../../stylesheets/main.scss';

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
    <div className={Style.THcard} style={inlineStyle}>
      <img src={props.source} />
    </div>
  );
};

export default CardImage;