import { readInput } from "../../common";

function* getNeighbors(
  keys: number[],
  includeSelf = false
): Generator<string, void> {
  if (keys.length === 0) {
    yield "";
    return;
  }

  const x = keys[0];

  for (let pair of getNeighbors(keys.slice(1), true)) {
    if (pair.endsWith(",")) pair = pair.substr(0, pair.length - 1);
    if (includeSelf) {
      yield `${x},${pair}`;
    } else {
      includeSelf = true;
    }
    yield `${x - 1},${pair}`;
    yield `${x + 1},${pair}`;
  }
}

function getMinMax(grid: Set<string>) {
  let min: number[] = [];
  let max: number[] = [];
  for (const key of grid.keys()) {
    const dimensions = key.split(",").map(Number);
    for (let i = 0; i < dimensions.length; i++) {
      const x = dimensions[i];
      if (min[i] === undefined || min[i] >= x) {
        min[i] = x - 1;
      }
      if (max[i] === undefined || max[i] <= x) {
        max[i] = x + 1;
      }
    }
  }

  return { min, max };
}

function* getKeys(min: number[], max: number[]): Generator<number[], void> {
  if (min.length === 0) {
    yield [];
    return;
  }

  for (let i = min[0]; i <= max[0]; i++) {
    for (const next of getKeys(min.slice(1), max.slice(1))) {
      yield [i, ...next];
    }
  }
}

function calculateNewGrid(grid: Set<string>) {
  const newGrid = new Set<string>();

  const { min, max } = getMinMax(grid);

  for (const keyArr of getKeys(min, max)) {
    const key = keyArr.join(",");
    const isOn = grid.has(key);

    let neighbors = 0;
    for (const neighbor of getNeighbors(keyArr)) {
      if (grid.has(neighbor)) neighbors++;
    }

    if (neighbors === 3 || (neighbors === 2 && isOn)) {
      newGrid.add(key);
    }
  }

  return newGrid;
}

function main() {
  const input = readInput();

  let grid = new Set<string>();
  const dimensions = 3;

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === "#") {
        const key = `${"0,".repeat(dimensions - 2)}${y},${x}`;
        grid.add(key);
      }
    }
  }

  for (let runs = 0; runs < 6; runs++) {
    grid = calculateNewGrid(grid);
  }

  return grid.size;
}

console.log(main());
