const { readInput } = require("./read-input");

function main() {
  const numbers = readInput();
  for (const num of numbers) {
    const other = 2020 - num;
    if (numbers.includes(other)) {
      return num * other;
    }
  }
}

console.log("Part 1:", main());
