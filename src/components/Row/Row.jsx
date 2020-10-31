import React from "react";
// Component(s)
import Square from '../Square/Square.jsx';

function Row({ rowSquares }) {
  return (
    rowSquares.map((square, i) => {
      return <Square key={i} coordinates={[square.x, square.y]} />
    })
  );
}

export default Row;