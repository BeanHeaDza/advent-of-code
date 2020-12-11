import { readInput } from "../../common";

function getArrangements(input: number[]) {
  const arrangements = new Set();

  function inner(numbers: number[]) {
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
  const numbers = [...input, "0"].map(Number).sort((a, b) => a - b);
  numbers.push(numbers[numbers.length - 1] + 3);

  const subArrays = [];
  let nextStart = 0;

  for (let x = 1; x < numbers.length; x++) {
    const current = numbers[x];
    const prev = numbers[x - 1];
    if (current - prev === 3) {
      subArrays.push(numbers.slice(nextStart, x));
      nextStart = x;
    }
  }

  subArrays.map(getArrangements);

  let answer = 1;
  for (const x of subArrays.map(getArrangements)) {
    answer *= x;
  }
  return answer;
}

console.log(main());
