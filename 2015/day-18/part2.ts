import { readInput } from "../../common";

class Grid {
  get height() {
    return this.input.length;
  }

  get width() {
    return this.input[0].length;
  }

  constructor(private readonly input: string[]) {}

  isEdge(x: number, y: number) {
    if (y !== 0 && y !== this.input.length - 1) {
      return false;
    }

    if (x !== 0 && x !== this.input[y].length - 1) {
      return false;
    }

    return true;
  }

  getState(x: number, y: number) {
    if (this.isEdge(x, y)) {
      return "#";
    }

    if (x < 0 || y < 0 || y >= this.input.length || x > this.input[y].length) {
      return ".";
    }

    return this.input[y][x];
  }

  neighborCount(x: number, y: number) {
    let count = 0;
    if (this.getState(x + 1, y) === "#") count++;
    if (this.getState(x, y + 1) === "#") count++;
    if (this.getState(x - 1, y) === "#") count++;
    if (this.getState(x, y - 1) === "#") count++;
    if (this.getState(x - 1, y - 1) === "#") count++;
    if (this.getState(x - 1, y + 1) === "#") count++;
    if (this.getState(x + 1, y - 1) === "#") count++;
    if (this.getState(x + 1, y + 1) === "#") count++;

    return count;
  }

  isOn(x: number, y: number) {
    return this.getState(x, y) === "#";
  }
}

function main() {
  let input = readInput();

  for (let i = 0; i < 100; i++) {
    const grid = new Grid(input);
    input = [];
    for (let y = 0; y < grid.height; y++) {
      let next = "";
      for (let x = 0; x < grid.width; x++) {
        const isOn = grid.isOn(x, y);
        const neighbors = grid.neighborCount(x, y);
        if (grid.isEdge(x, y)) {
          next += "#";
        } else if (isOn && (neighbors < 2 || neighbors > 3)) {
          next += ".";
        } else if (!isOn && neighbors === 3) {
          next += "#";
        } else {
          next += grid.getState(x, y);
        }
      }
      input.push(next);
    }
  }

  return input
    .join("")
    .split("")
    .filter((c) => c === "#").length;
}

console.log(main());
