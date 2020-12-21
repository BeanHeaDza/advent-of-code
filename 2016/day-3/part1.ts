import { readInput } from "../../common";

function main() {
  const input = readInput();
  return input
    .map((l) =>
      l
        .trim()
        .split(/\s+/)
        .map(Number)
        .sort((a, b) => a - b)
    )
    .filter(([x, y, z]) => x + y > z).length;
}

console.log(main());
