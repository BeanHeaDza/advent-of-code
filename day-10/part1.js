const { readInput } = require("./read-input");

function main() {
  const input = readInput();
  const nums = [...input, "0"].map(Number).sort((a, b) => a - b);
  let ones = 0;
  let threes = 1;
  for (let x = 0; x < nums.length; x++) {
    const X = nums[x];
    const Y = nums[x + 1];
    if (Y - X === 1) {
      ones++;
    } else if (Y - X === 3) {
      threes++;
    }
  }
  return ones * threes;
}

console.log("Part 1:", main());
