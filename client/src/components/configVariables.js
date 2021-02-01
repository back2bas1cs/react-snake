export const variables = {
  // # of "tiles"/"squares" on board axis (both x & y)
  DIMENSION: 10,
  // width/height (in pixels) of each square
  WIDTH: 100,
  // starting speed of snake (moves one tile per 'START_SPEED' ms)
  START_SPEED: 500,
  // percent increment (of START_SPEED) by which speed of snake increases 
  SPEED_PERCENT_INCREASE: 10,
  // how many pieces of food snake must eat before it levels up (increases in speed)
  FOOD_TO_LVL_UP: 5,
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