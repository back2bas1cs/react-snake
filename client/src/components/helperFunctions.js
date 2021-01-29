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
  } while (grid[position.x][position.y] !== "empty");
  return position;
}

export function useInterval(callback, delay) {
  const savedCallback = useRef();
  
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  
  // Set up the interval.
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