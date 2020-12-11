import { readInput } from "../common";

function main() {
  const numbers = readInput().map(Number);
  for (const num of numbers) {
    const other = 2020 - num;
    if (numbers.includes(other)) {
      return num * other;
    }
  }
}

console.log(main());
