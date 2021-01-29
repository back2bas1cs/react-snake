export const variables = {
  // # of "tiles"/"squares" on board axis (both x & y)
  DIMENSION: 10,
  // width/height (in pixels) of each square
  WIDTH: 100,
  // starting speed of snake (moves one tile per 'START_SPEED' ms)
  START_SPEED: 500,
  // increment by which speed of snake increases (in ms)
  SPEED_INCREMENT: 100,
  // directions for snake to travel -- mapped to associated key codes (arrow keys)
  DIRECTIONS: {
    "38": "up",
    "40": "down",
    "39": "right",
    "37": "left",
    "opposites": {
      "up": "down",
      "down": "up",
      "left": "right",
      "right": "left"
    }
  }
};