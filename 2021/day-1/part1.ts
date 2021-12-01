import { readInput } from "../../common";

function main() {
  const numbers = readInput().map(Number);
  let prev = Number.POSITIVE_INFINITY;
  let count = 0;
  for (const num of numbers) {
      if (num > prev) {
        count++;
      }
      prev = num;
  }
  return count;
}

console.log(main());
