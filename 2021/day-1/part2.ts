import { readInput } from "../../common";

function main() {
  const numbers = readInput().map(Number);
  let count = 0;

  for (let i = 0; i < numbers.length; i++) {
      if (numbers[i-1] < numbers[i+2]) {
          count++;
      }
  }
  return count;
}

console.log(main());
