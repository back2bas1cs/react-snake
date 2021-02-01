import { useEffect, useRef } from "react";

export function generateGrid(dimension) {
  let grid = []
  for (let i = 0; i < dimension; i++) {
    let row = []
    for (let j = 0; j < dimension; j++) {
      row.push("empty")
    }
    grid.push(row);
  }
  return grid;
}

export function getRandomPosition(dimension, grid) {
  const randomCoordinate = () => Math.floor(Math.random() * dimension);
  let position;
  do {
    position = {
      x: randomCoordinate(), 
      y: randomCoordinate()
    };
  } while (grid[position.y][position.x] !== "empty");
  return position;
}

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // recall lastest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  
  // set up interval
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
  
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}