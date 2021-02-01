import React, { useState, useEffect, useRef } from "react";
import { generateGrid, getRandomPosition, useInterval } from "./helperFunctions.js";
import { variables } from "./configVariables.js";
// Component(s):
import Board from "./Board/Board.jsx";

function App() {
  const [gridMap, setGridMap] = useState(generateGrid(variables.DIMENSION));
  const [food, setFood] = useState(getRandomPosition(variables.DIMENSION, gridMap));

  const [snake, _setSnake] = useState([getRandomPosition(variables.DIMENSION, gridMap)]);
  const snakeRef = useRef(snake);
  const setSnake = data => {
    snakeRef.current = data;
    _setSnake(data);
  }

  const [direction, _setDirection] = useState(null);
  const directionRef = useRef(direction); 
  const setDirection = data => {
    directionRef.current = data;
    _setDirection(data);
  };

  const [speed, setSpeed] = useState(variables.START_SPEED);

  const [paused, _setPaused] = useState(true);
  const pausedRef = useRef(paused);
  const setPaused = data => {
    pausedRef.current = data;
    _setPaused(data);
  }

  // add listener (for key presses), but only on the very first render
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, false);
    return () => {
      document.removeEventListener("keydown", handleKeyPress, false);
    };
  }, []);

  useEffect(() => {
    let updatedGrid = generateGrid(variables.DIMENSION);
    snake.forEach(segment => {
      updatedGrid[segment.y][segment.x] = "snake";
    });
    updatedGrid[food.y][food.x] = "food";
    setGridMap(updatedGrid);
  }, [snake]);

  function handleKeyPress(e) {
    e.preventDefault();
    const keyCode = e.keyCode;
    const key = variables.DIRECTIONS[String(keyCode)];
    // pause game if 'space bar' is pressed
    if (keyCode === 32) setPaused(prevState => !prevState);
    else if (key) { 
      if (pausedRef.current) setPaused(false);
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
  }

  function moveSnake() {
    let newSnake = [];
    if (paused || !direction) return;
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
      // case null:
      //   return;
    }
    // fill new array with rest of snake if it has more than a "head"
    if (snake.length >= 1) {
      snake.forEach(segment => {
        newSnake.push(segment);
      });
    }   
    // check for gameover: snake runs into itself, or hits boundary
    if (checkGameOver(newSnake[0])) return;
    // check if snake has eaten food
    if (snake[0].x === food.x && snake[0].y === food.y) {
      handleEatFood(newSnake.length);
    } else { // else remove tail (to create illusion of movement)
      newSnake.pop();
    }
    // update state of snake array
    setSnake(newSnake);
  }

  function checkGameOver(snakeHead) {
    if (
      (snakeHead.x < 0 || snakeHead.x > variables.DIMENSION - 1 || snakeHead.y < 0 || snakeHead.y > variables.DIMENSION - 1) ||
      (gridMap[snakeHead.y][snakeHead.x] === "snake" && snake.length > 1) 
    ) {
      setPaused(true);
      setSpeed(variables.START_SPEED);
      setDirection(null);
      setFood(getRandomPosition(variables.DIMENSION, gridMap));
      setSnake([getRandomPosition(variables.DIMENSION, gridMap)]);
      return true;
    }
    return false;
  }

  function handleEatFood(currentSnakeLength) {
    // generate new food position
    setFood(getRandomPosition(variables.DIMENSION, gridMap));
    // if snake has eaten 'FOOD_TO_LVL_UP' pieces of food → increase speed by 'SPEED_PERCENT_INCREASE' percent of current speed
    if ((currentSnakeLength - 1) % variables.FOOD_TO_LVL_UP === 0) {
      setSpeed(prevSpeed => prevSpeed * ((100 - variables.SPEED_PERCENT_INCREASE) / 100));
    }
  }

  useInterval(moveSnake, paused ? null : speed);

  return <Board squareWidth={variables.WIDTH} grid={gridMap} />;
}

export default App;