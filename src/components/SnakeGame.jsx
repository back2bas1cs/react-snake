import React, { useState, useEffect } from "react";
import "./snake.scss";

function SnakeGame() {
  const DIRECTIONS = {
    "38": "up",
    "40": "down",
    "39": "right",
    "37": "left"
  }
  // Object.values(DIRECTIONS)[Math.floor(Math.random() * 4)]
  const [snake, setSnake] = useState([[200, 200], [210, 200]]);
  const [currentDirection, setCurrentDirection] = useState("down");

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, false);
    return () => {
      document.removeEventListener("keydown", handleKeyPress, false );
    }
  });

  useEffect(() => {
    console.log("test");
  }, [snake]);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      moveSnake();
    }, 200);
    return () => {
      clearInterval(moveInterval);
    }
  }, [currentDirection]);

  function handleKeyPress(e) {
    const key = DIRECTIONS[String(e.keyCode)];

    // if (snake.length === 1) {
    //   setCurrentDirection(key)
    // } else 
    if (key === "up" && currentDirection !== "up" && currentDirection !== "down") {
      setCurrentDirection(key);
    } else if (key === "down" && currentDirection !== "down" && currentDirection !== "up") {
      setCurrentDirection(key);
    } else if (key === "right" && currentDirection !== "right" && currentDirection !== "left") {
      setCurrentDirection(key);
    } else if (key === "left" && currentDirection !== "left" && currentDirection !== "right") {
      setCurrentDirection(key);
    }
  }

  // have timer and every second we move()
    // this means we copy the head, and project where it will be next, add it to the front of the array, then chop off the tail
    // if we go over a fruit, just don't chop off the tail

  function moveSnake() {
    // [[200, 200], [210, 200]]
    let head = snake[0];
    let newHead = head;
    if (currentDirection === "up") {
      newHead[0] = head[0] - 10;
    } else if (currentDirection === "down") {
      newHead[0] = head[0] + 10;
    } else if (currentDirection === "right") {
      newHead[1] = head[1] + 10;
    } else if (currentDirection === "left") {
      newHead[1] = head[1] - 10;
    }
    var a = 2;
    var b = a;
    let newSnake = [...snake];
    newSnake.unshift(newHead);
    setSnake(newSnake);
  }


  return (
    <>
      {    
        snake.map((segment, i) => {
          return <div id="snake" key={i} className="snake" style={{ top: segment[0] + "px", left: segment[1] + "px"}}></div>
        })
      }
    </>
  );
}

export default SnakeGame;