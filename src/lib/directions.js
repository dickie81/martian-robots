export const directions = ["N", "E", "S", "W"];
const directionModifiers = {
  N: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  S: { x: 0, y: -1 },
  W: { x: -1, y: 0 },
};

export const isValidDirection = (direction) => directions.includes(direction);

export const getNewDirection = (currentDirection, instruction) => {
  const newDirectionIndex =
    (directions.indexOf(currentDirection) +
      directions.length +
      (instruction === "L" ? -1 : 1)) %
    directions.length;

  return directions[newDirectionIndex];
};

export const moveInDirection = (coords, direction) => {
  const mods = directionModifiers[direction];
  return [(coords[0] += mods.x), (coords[1] += mods.y)];
};
