import { readInput } from "../../common";

function fullyContains(smaller: number[], bigger: number[]) {
  return smaller[0] >= bigger[0] && smaller[1] <= bigger[1];
}

function main() {
  const input = readInput();
  let answer = 0;
  for (const line of input) {
    const [elf1, elf2] = line.split(",").map((a) => a.split("-").map(Number));
    answer += fullyContains(elf1, elf2) || fullyContains(elf2, elf1) ? 1 : 0;
  }
  return answer;
}

console.log(main());
