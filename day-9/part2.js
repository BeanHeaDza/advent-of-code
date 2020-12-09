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

function findFirstInvalid(numbers) {
  const pre = 25;

  for (let index = pre; index < numbers.length; index++) {
    const element = numbers[index];

    if (!isValid(numbers.slice(index - pre, index), element)) {
      return element;
    }
  }
}

function searchRange(numbers, target) {
  let sum = numbers[0];
  let lower = 0;
  let upper = 0;

  while (upper < numbers.length) {
    if (sum < target) {
      upper++;
      sum += numbers[upper];
    } else if (sum > target) {
      sum -= numbers[lower];
      lower++;
    } else {
      let min = Number.POSITIVE_INFINITY;
      let max = Number.NEGATIVE_INFINITY;
      for (let x = lower; x <= upper; x++) {
        const element = numbers[x];
        if (element < min) {
          min = element;
        }
        if (element > max) {
          max = element;
        }
      }
      return min + max;
    }
  }
}

function main() {
  const input = readInput();
  const numbers = input.map(Number);
  const target = findFirstInvalid(numbers);

  return searchRange(numbers, target);
}

console.log("Part 2:", main());
