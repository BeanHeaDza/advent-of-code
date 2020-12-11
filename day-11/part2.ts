import { readInput } from "../common";

function getAtIndex(input: string[], x: number, y: number) {
  if (x < 0 || x >= input[0].length) {
    return "L";
  }
  if (y < 0 || y >= input.length) {
    return "L";
  }

  return input[y][x];
}

function lookOverEmpty(
  input: string[],
  x: number,
  y: number,
  xInc: number,
  yInc: number
) {
  let char: string;
  do {
    x += xInc;
    y += yInc;
    char = getAtIndex(input, x, y);
  } while (char === ".");

  return char;
}

function getOccupiedNeighbors(input: string[], x: number, y: number) {
  let occupied = 0;

  if (lookOverEmpty(input, x, y, 1, 0) === "#") occupied++;
  if (lookOverEmpty(input, x, y, 0, 1) === "#") occupied++;
  if (lookOverEmpty(input, x, y, -1, 0) === "#") occupied++;
  if (lookOverEmpty(input, x, y, 0, -1) === "#") occupied++;
  if (lookOverEmpty(input, x, y, 1, 1) === "#") occupied++;
  if (lookOverEmpty(input, x, y, -1, 1) === "#") occupied++;
  if (lookOverEmpty(input, x, y, 1, -1) === "#") occupied++;
  if (lookOverEmpty(input, x, y, -1, -1) === "#") occupied++;

  return occupied;
}

function calculateNextStyle(input, x, y) {
  const current = getAtIndex(input, x, y);
  if (current === ".") {
    return current;
  }

  const occupied = getOccupiedNeighbors(input, x, y);
  if (current === "L" && occupied === 0) {
    return "#";
  }

  if (current === "#" && occupied >= 5) {
    return "L";
  }

  return current;
}

function main() {
  let input = readInput();
  let previous: string;

  do {
    previous = input.join("\n");
    const next = [];
    for (let y = 0; y < input.length; y++) {
      next.push("");
      for (let x = 0; x < input[y].length; x++) {
        next[y] += calculateNextStyle(input, x, y);
      }
    }

    input = next;
  } while (input.join("\n") !== previous);

  return previous.split("").filter((c) => c === "#").length;
}

console.log(main());
