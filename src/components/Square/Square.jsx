import React from "react";
import "./square.scss";

function Square({ coordinates }) {

  const styles = {
    position: "absolute",
    left: String(coordinates[0] * 50) + "px",
    top: String(coordinates[1] * 50) + "px"
  }

  return (
    <div className="square" style={{...styles}}>
      {coordinates[0]}, 
      {coordinates[1]}
    </div>
  );
}

export default Square;