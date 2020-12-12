import { createGrid, readInput } from "../../common";

const instruction = /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/;

function main() {
  const input = readInput();
  const grid = createGrid(0, 1000, 1000);

  for (const line of input) {
    const match = instruction.exec(line);
    const action = match[1];
    const [sX, sY, eX, eY] = match.slice(2).map(Number);

    for (let x = sX; x <= eX; x++) {
      for (let y = sY; y <= eY; y++) {
        if (action === "turn on") {
          grid[y][x] += 1;
        } else if (action === "turn off") {
          grid[y][x] = Math.max(grid[y][x] - 1, 0);
        } else {
          grid[y][x] += 2;
        }
      }
    }
  }

  let answer = 0;
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    for (let x = 0; x < row.length; x++) {
      answer += row[x];
    }
  }

  return answer;
}

console.log(main());
