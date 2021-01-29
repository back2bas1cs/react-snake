import React from "react";
// Style(s)
import "./square.scss";

function Square({ width, type }) {
  return (
    <div className={"square " + type } style={{ width, height: width }}>
    </div>
  );
}

export default Square;