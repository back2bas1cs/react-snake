import React, { useState, useEffect, useRef } from "react";
import { generateGrid, getRandomPosition, useInterval } from "./helperFunctions.js";
import { variables } from "./configVariables.js";
// Component(s):
import Board from "./Board/Board.jsx";

function App() {
  const [gridMap, setGridMap] = useState(generateGrid(variables.DIMENSION));
  // const gridRef = useRef(gridMap);
  // const setGridMap = data => {
  //   gridRef.current = data;
  //   _setGridMap(data);
  // };
  const [food, setFood] = useState(getRandomPosition(variables.DIMENSION, gridMap));
  const [snake, _setSnake] = useState([getRandomPosition(variables.DIMENSION, gridMap)]);
  const snakeRef = useRef(snake);
  const setSnake = data => {
    snakeRef.current = data;
    _setSnake(data);
  }
  // const [tail, setTail] = useState(snake[0]);
  const [direction, _setDirection] = useState(null);
  const directionRef = useRef(direction); 
  const setDirection = data => {
    directionRef.current = data;
    _setDirection(data);
  };
  const [speed, setSpeed] = useState(variables.START_SPEED);
  
  // add listener (for key presses), but only on the very first render
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, false);
    return () => {
      document.removeEventListener("keydown", handleKeyPress, false);
    };
  }, []);

  useEffect(() => {
    // let updatedGrid = gridRef.current;
    let updatedGrid = generateGrid(variables.DIMENSION);
    // updatedGrid[tail.y][tail.x] = "blank";
    snake.forEach(segment => {
      updatedGrid[segment.y][segment.x] = "snake";
    });
    updatedGrid[food.y][food.x] = "food";
    setGridMap(updatedGrid);
  }, [snake]);

  function handleKeyPress(e) {
    e.preventDefault();
    const key = variables.DIRECTIONS[String(e.keyCode)];
    if (
      // if key pressed was an arrow key
      key &&
      // if said arrow key wasn't the same as the current direction (avoid superflous calls to setDirection())
      key !== directionRef.current &&
      // if snake is just "head" piece (hasn't eaten yet), OR we're NOT trying to move in the exact opposite direction
      (snakeRef.current.length === 1 || directionRef.current !== variables.DIRECTIONS.opposites[key])
    ) {
      setDirection(key);
    }
  }

  function moveSnake() {
    let newSnake = [];
    switch(direction) {
      case "up": 
        newSnake.push({ x: snake[0].x, y: snake[0].y - 1 });
        break;
      case "down": 
        newSnake.push({ x: snake[0].x, y: snake[0].y + 1 });
        break;
      case "left": 
        newSnake.push({ x: snake[0].x - 1, y: snake[0].y });
        break;
      case "right": 
        newSnake.push({ x: snake[0].x + 1, y: snake[0].y });
        break;
      default:
        newSnake.push({ x: snake[0].x, y: snake[0].y });
    }
    // fill new array with rest of snake if it has more than a "head"
    if (snake.length >= 1) {
      snake.forEach(segment => {
        newSnake.push(segment);
      });
    }   
    // setTail(snake[snake.length - 1]);
    // check for gameover: snake runs into itself, or hits boundary
    checkGameOver(newSnake[0]);
    // check if snake has eaten food
    if (snake[0].x === food.x && snake[0].y === food.y) handleEatFood(newSnake.length);
    else newSnake.pop(); // else remove tail (to create illusion of movement)
    // update state of snake array
    setSnake(newSnake);
  }

  function checkGameOver(snakeHead) {
    const headLocation = gridMap[snakeHead.y][snakeHead.x] || null;
    if (!headLocation || (headLocation === "snake" && snake.length > 1)) alert("Game Over!");
  }

  function handleEatFood(currentSnakeLength) {
    console.log(currentSnakeLength);
    // generate new food position
    setFood(getRandomPosition(variables.DIMENSION, gridMap));
    // if snake has eaten 'LVL_UP_INCREMENT' pieces of food → increase speed by 'SPEED_PERCENT_INCREASE' percent of current speed
    if (currentSnakeLength % variables.LVL_UP_INCREMENT) {
      setSpeed(prevSpeed => prevSpeed * ((100 - variables.SPEED_PERCENT_INCREASE) / 100));
    }
  }

  useInterval(moveSnake, speed);

  return <Board squareWidth={variables.WIDTH} grid={gridMap} />;
}

export default App;