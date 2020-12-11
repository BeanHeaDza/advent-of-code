const { readInput } = require("./read-input");

function getAtIndex(input, x, y) {
  if (x < 0 || x >= input[0].length) {
    return "L";
  }
  if (y < 0 || y >= input.length) {
    return "L";
  }

  return input[y][x];
}

function getOccupiedNeighbors(input, x, y) {
  let occupied = 0;
  if (getAtIndex(input, x + 1, y) === "#") occupied++;
  if (getAtIndex(input, x - 1, y) === "#") occupied++;
  if (getAtIndex(input, x, y + 1) === "#") occupied++;
  if (getAtIndex(input, x, y - 1) === "#") occupied++;
  if (getAtIndex(input, x + 1, y + 1) === "#") occupied++;
  if (getAtIndex(input, x - 1, y - 1) === "#") occupied++;
  if (getAtIndex(input, x + 1, y - 1) === "#") occupied++;
  if (getAtIndex(input, x - 1, y + 1) === "#") occupied++;

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

  if (current === "#" && occupied >= 4) {
    return "L";
  }

  return current;
}

function main() {
  let input = readInput();
  let previous;

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

console.log("Part 1:", main());
