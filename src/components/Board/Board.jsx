import React, { useState, useEffect } from "react";
import "./board.scss";
import randomCoordinate from "./boardHelpers.js";
// Component(s)
import Row from '../Row/Row.jsx';

function Board() {
  const DIMENSION = 10;
  const BOARD = createBoard();
  const [appleCoord, setAppleCoord] = useState(randomCoordinate(DIMENSION));
  const [ateAppleCount, setAteAppleCount] = useState(0);
 
  useEffect(() => {
    setAppleCoord(randomCoordinate(DIMENSION));
  }, [ateAppleCount]);

  function createBoard() {
    let grid = [];
    for (let y = 0; y < DIMENSION; y++) {
      const row = [];
      for (let x = 0; x < DIMENSION; x++) {
       row.push({ x, y });
      }
      grid.push(row); 
    }
    return grid; 
  }

  return (
    <div className="board">
      {
        BOARD.map((row, i) => {
          return <Row key={i} rowSquares={row} />
        })
      }
    </div>
  );
}

export default Board;