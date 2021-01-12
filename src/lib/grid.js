const replaceArrayIndex = (arr, index, newVal) => {
  return [...arr.slice(0, index), newVal, ...arr.slice(index + 1)];
};

export const createGrid = (width, height) =>
  Array.from({
    length: height,
  }).map((row, y) =>
    Array.from({ length: width }).map((cell, x) => ({
      x,
      y,
      scents: [],
    }))
  );

export const addScent = (grid, coords, direction) => {
  const origRow = grid[coords[1]];
  const origCell = origRow[coords[0]];

  const newRow = replaceArrayIndex(origRow, coords[0], {
    ...origCell,
    scents: [...origCell.scents, direction],
  });

  return replaceArrayIndex(grid, coords[1], newRow);
};
