const { readInput } = require("./read-input");

function getArrangements(input) {
  const arrangements = new Set();

  function inner(numbers) {
    arrangements.add(numbers.join(","));

    for (let x = 0; x < numbers.length; x++) {
      const prev = numbers[x - 1];
      const next = numbers[x + 1];
      if (next - prev <= 3) {
        inner([...numbers.slice(0, x), ...numbers.slice(x + 1)]);
      }
    }
  }

  inner(input);

  return arrangements.size;
}

function main() {
  const input = readInput();
  const nums = [...input, "0"].map(Number).sort((a, b) => a - b);
  nums.push(nums[nums.length - 1] + 3);

  const subArrs = [];
  let nextStart = 0;

  for (let x = 1; x < nums.length; x++) {
    const current = nums[x];
    const prev = nums[x - 1];
    if (current - prev === 3) {
      subArrs.push(nums.slice(nextStart, x));
      nextStart = x;
    }
  }

  subArrs.map(getArrangements);

  let answer = 1;
  for (const x of subArrs.map(getArrangements)) {
    answer *= x;
  }
  return answer;
}

console.log("Part 2:", main());
