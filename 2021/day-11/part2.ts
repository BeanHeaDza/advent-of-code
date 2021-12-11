import { readInput } from "../../common";

function main() {
  const input = readInput();
  const grid = input.map((l) => l.split("").map(Number));
  let answer = 0;

  let s = 0;
  while (true) {
    s++;
    const flashed = new Set<string>();
    for (let x = 0; x < grid.length; x++) {
      const row = grid[x];
      for (let y = 0; y < row.length; y++) {
        if (++row[y] > 9) {
          flash(grid, x, y, flashed);
        }
      }
    }

    for (let x = 0; x < grid.length; x++) {
      const row = grid[x];
      for (let y = 0; y < row.length; y++) {
        if (row[y] > 9) {
          row[y] = 0;
        }
      }
    }
    if (flashed.size === 100) {
      return s;
    }
  }
}

console.log(main());

function flash(grid: number[][], x: number, y: number, flashed: Set<string>) {
  const id = `${x},${y}`;
  if (flashed.has(id)) {
    return;
  }
  flashed.add(id);

  const action = (aX: number, aY: number) => {
    if (aX < 0 || aX >= grid.length) {
      return;
    }
    const row = grid[aX];
    if (aY < 0 || aY >= row.length) {
      return;
    }
    if (++row[aY] > 9) {
      flash(grid, aX, aY, flashed);
    }
  };

  action(x + 1, y + 1);
  action(x + 1, y - 1);
  action(x + 1, y);
  action(x - 1, y + 1);
  action(x - 1, y - 1);
  action(x - 1, y);
  action(x, y + 1);
  action(x, y - 1);
}
