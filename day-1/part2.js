const { readInput } = require("./read-input");

function main() {
  const numbers = readInput();
  for (let x = 0; x < numbers.length; x++) {
    const first = numbers[x];
    for (let y = x + 1; y < numbers.length; y++) {
      const second = numbers[y];
      const third = 2020 - first - second;
      if (numbers.includes(third)) {
        return first * second * third;
      }
    }
  }
}

console.log("Part 2:", main());
