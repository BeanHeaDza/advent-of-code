import { sum } from "lodash";
import { createGrid, readInput } from "../../common";

type Grid = boolean[][];

function rect(grid: Grid, a: number, b: number) {
  for (let y = 0; y < b; y++) {
    for (let x = 0; x < a; x++) {
      grid[y][x] = true;
    }
  }
}

function rotate(grid: Grid, action: string, index: number, count: number) {
  const rowRotate = (row: boolean[]) => {
    const newRow: boolean[] = [];
    for (let x = 0; x < row.length; x++) {
      newRow[(x + count) % row.length] = row[x];
    }
    return newRow;
  };

  switch (action) {
    case "row":
      grid[index] = rowRotate(grid[index]);
      break;

    case "column":
      let column = grid.map((r) => r[index]);
      column = rowRotate(column);
      for (let x = 0; x < column.length; x++) {
        grid[x][index] = column[x];
      }
      break;

    default:
      throw new Error();
  }
}

function execute(grid: Grid, line: string) {
  const parts = line.split(" ");
  switch (parts[0]) {
    case "rect":
      const [a, b] = parts[1].split("x").map(Number);
      rect(grid, a, b);
      break;

    case "rotate":
      rotate(grid, parts[1], +parts[2].slice(2), +parts[4]);
      break;

    default:
      throw new Error();
  }
}

function main() {
  const input = readInput();
  const grid: Grid = createGrid(false, 50, 6);

  for (const line of input) {
    execute(grid, line);
  }

  return sum(grid.map((line) => line.filter((p) => p).length));
}

console.log(main());
