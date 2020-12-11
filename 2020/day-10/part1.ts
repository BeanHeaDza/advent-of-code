import { readInput } from "../../common";

function main() {
  const input = readInput();
  const numbers = [...input, "0"].map(Number).sort((a, b) => a - b);
  let ones = 0;
  let threes = 1;
  for (let x = 0; x < numbers.length; x++) {
    const X = numbers[x];
    const Y = numbers[x + 1];
    if (Y - X === 1) {
      ones++;
    } else if (Y - X === 3) {
      threes++;
    }
  }
  return ones * threes;
}

console.log(main());
