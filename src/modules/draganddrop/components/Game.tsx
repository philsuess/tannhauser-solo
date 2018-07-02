import * as React from "react";
import Board from "./Board";

interface State {
  knightPosition: [number, number];
}

export default class Game extends React.Component<{}, State> {
  state: State = { knightPosition: [1, 7] };

  render() {
    const { knightPosition } = this.state;
    return (
      <Board
        knightPosition={knightPosition}
        moveKnight={(toX: number, toY: number) =>
          this.setState({ knightPosition: [toX, toY] })
        }
        canMoveKnight={(tox: number, toy: number) =>
          this.canMoveKnight(tox, toy)
        }
      />
    );
  }

  private canMoveKnight(toX: number, toY: number) {
    const [x, y] = this.state.knightPosition;
    const dx = toX - x;
    const dy = toY - y;

    return (
      (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
      (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    );
  }
}
