import React, { Component } from "react";
import Square from "./Square";
import Knight from "./Knight";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import BoardSquare from "./BoardSquare";

interface Props {
  knightPosition: [number, number];
  moveKnight: (toX: number, toY: number) => void;
  canMoveKnight: (toX: number, toY: number) => boolean;
}

class Board extends Component<Props> {
  renderSquare(i: number) {
    const { moveKnight } = this.props;
    const x = i % 8;
    const y = Math.floor(i / 8);
    return (
      <div key={i} style={{ width: "12.5%", height: "12.5%" }}>
        <BoardSquare x={x} y={y} moveKnight={moveKnight}>
          {this.renderPiece(x, y)}
        </BoardSquare>
      </div>
    );
  }

  private renderPiece(x: number, y: number) {
    const [knightX, knightY] = this.props.knightPosition;
    if (x === knightX && y === knightY) {
      return <Knight />;
    }
  }

  render() {
    const squares = [];
    for (let i = 0; i < 64; i += 1) {
      squares.push(this.renderSquare(i));
    }

    return (
      <div
        style={{
          width: "500px",
          height: "500px",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {squares}
      </div>
    );
  }
}
export default DragDropContext(HTML5Backend)(Board);
