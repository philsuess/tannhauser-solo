import React, { Component } from "react";
import Square from "./Square";
import {
  DropTargetSpec,
  DropTargetCollector,
  DropTarget,
  DropTargetConnector,
  ConnectDropTarget,
} from "react-dnd";
import { ItemTypes } from "../model";
interface BoardSquareProps {
  x: number;
  y: number;
  moveKnight: (x: number, y: number) => void;
}
const squareTarget: DropTargetSpec<BoardSquareProps> = {
  drop(props, monitor) {
    props.moveKnight(props.x, props.y);
  },
};

const collect: DropTargetCollector = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
});

class BoardSquare extends Component<
  BoardSquareProps & { connectDropTarget: ConnectDropTarget; isOver: boolean }
> {
  render() {
    const { x, y, connectDropTarget, isOver } = this.props;
    const black = (x + y) % 2 === 1;
    return connectDropTarget(
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <Square black={black}>{this.props.children}</Square>
        {isOver && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              zIndex: 1,
              opacity: 0.5,
              backgroundColor: "yellow",
            }}
          />
        )}
      </div>
    );
  }
}
export default DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(BoardSquare);
