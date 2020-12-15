import { readInput } from "../../common";

function getState(input: string[], x: number, y: number) {
  if (x < 0 || y < 0 || y >= input.length || x > input[y].length) {
    return ".";
  }

  return input[y][x];
}

function neighborCount(input: string[], x: number, y: number) {
  let count = 0;
  if (getState(input, x + 1, y) === "#") count++;
  if (getState(input, x, y + 1) === "#") count++;
  if (getState(input, x - 1, y) === "#") count++;
  if (getState(input, x, y - 1) === "#") count++;
  if (getState(input, x - 1, y - 1) === "#") count++;
  if (getState(input, x - 1, y + 1) === "#") count++;
  if (getState(input, x + 1, y - 1) === "#") count++;
  if (getState(input, x + 1, y + 1) === "#") count++;

  return count;
}

function main() {
  let input = readInput();

  for (let i = 0; i < 100; i++) {
    const newInput: string[] = [];
    for (let y = 0; y < input.length; y++) {
      let next = "";
      for (let x = 0; x < input[y].length; x++) {
        const isOn = input[y][x] === "#";
        const neighbors = neighborCount(input, x, y);
        if (isOn && (neighbors < 2 || neighbors > 3)) {
          next += ".";
        } else if (!isOn && neighbors === 3) {
          next += "#";
        } else {
          next += input[y][x];
        }
      }
      newInput.push(next);
    }
    input = newInput;
  }

  return input
    .join("")
    .split("")
    .filter((c) => c === "#").length;
}

console.log(main());
