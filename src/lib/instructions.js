import { isValidDirection } from "./directions";

const getInstructionLines = (instructionsStr) =>
  instructionsStr
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => !!line);

export const parseInstructions = (rawInstructions) => {
  if (!rawInstructions) {
    throw new Error("Empty instructions");
  }

  const instructions = {};
  const lines = getInstructionLines(rawInstructions);

  if (lines.length < 3 || lines.length % 2 !== 1) {
    throw new Error("Invalid instructions");
  }

  instructions.gridDimensions = lines[0].split(" ").map((d) => Number(d));

  if (
    instructions.gridDimensions.length !== 2 ||
    instructions.gridDimensions.some((d) => isNaN(d))
  ) {
    throw new Error("Invalid grid dimensions");
  }

  instructions.robots = lines.slice(1).reduce((acc, line, index) => {
    const robotIndex = Math.floor(index / 2);

    if (acc[robotIndex]) {
      // add directions
      const instructions = line.split("");

      // validate robot instructions
      if (
        instructions.some(
          (instruction) => !["L", "R", "F"].includes(instruction)
        )
      ) {
        throw new Error(`Invalid instructions for robot ${index}`);
      }

      acc[robotIndex] = { ...acc[robotIndex], instructions };
    } else {
      const parts = line.split(" ");
      const coords = [Number(parts[0]), Number(parts[1])];
      const direction = parts[2];

      if (
        parts.length !== 3 ||
        coords.some((coord) => isNaN(coord)) ||
        !isValidDirection(direction)
      ) {
        throw new Error(`Invalid start position for robot ${index}`);
      }

      if (
        coords[0] < 0 ||
        coords[0] > instructions.gridDimensions[0] ||
        coords[1] < 0 ||
        coords[1] > instructions.gridDimensions[1]
      ) {
        throw new Error(
          `Start position for robot ${index} is outside of the grid`
        );
      }

      acc[robotIndex] = { coords, direction };
    }

    return acc;
  }, []);

  return instructions;
};
