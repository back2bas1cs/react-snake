import React from "react";
// Style(s)
import "./board.scss";
// Component(s)
import Square from "../Square/Square.jsx";

function Board({ squareWidth, grid }) {
  const BOARD_SIZE = squareWidth * grid.length;
  
  const filledGrid = grid.map((row, i) => {
    return row.map((squareType, j) => {
      return <Square key={`${i}${j}`} width={squareWidth} type={squareType} />;
    });
  });

  const displayGrid = filledGrid.map((row, i) => (
    <li key={i} className="row" style={{ height: squareWidth }}>
      {row}
    </li>
  ));

  return (
    <div className="board" style={{ width: BOARD_SIZE, height: BOARD_SIZE }}>
      <ul>
        { displayGrid }
      </ul>
    </div>
  );
}

export default Board;