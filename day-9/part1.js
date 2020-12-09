const { readInput } = require("./read-input");

function isValid(arr, num) {
  for (let x = 0; x < arr.length; x++) {
    const elementX = arr[x];
    for (let y = x + 1; y < arr.length; y++) {
      const elementY = arr[y];
      if (elementX + elementY === num) {
        return true;
      }
    }
  }
  return false;
}

function main() {
  const input = readInput();
  const numbers = input.map(Number);
  const pre = 25;

  for (let index = pre; index < numbers.length; index++) {
    const element = numbers[index];

    if (!isValid(numbers.slice(index - pre, index), element)) {
      return element;
    }
  }
}

console.log("Part 1:", main());
