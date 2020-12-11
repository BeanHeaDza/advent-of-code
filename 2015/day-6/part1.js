const { createGrid } = require("../../common/create-grid");
const { readInput } = require("../../common/read-file");

const instruction = /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/;

function main() {
  const input = readInput();
  const grid = createGrid(false, 1000, 1000);

  for (const line of input) {
    const match = instruction.exec(line);
    const action = match[1];
    const [sX, sY, eX, eY] = match.slice(2).map(Number);

    for (let x = sX; x <= eX; x++) {
      for (let y = sY; y <= eY; y++) {
        if (action === "turn on") grid[y][x] = true;
        else if (action === "turn off") grid[y][x] = false;
        else grid[y][x] = !grid[y][x];
      }
    }
  }

  let answer = 0;
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    for (let x = 0; x < row.length; x++) {
      if (row[x]) {
        answer++;
      }
    }
  }

  return answer;
}

console.log(main());
