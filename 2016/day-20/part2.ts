import { readInput } from "../../common";

function main() {
  const input = readInput();
  const ranges = input
    .map((r) => r.split("-").map(Number))
    .sort((a, b) => a[0] - b[0]);
  let answer = 0;

  let [currentFrom, currentTo] = ranges.shift();
  if (currentFrom !== 0) {
    return 0;
  }
  for (const [from, to] of ranges) {
    if (from > currentTo + 1) {
      answer += from - currentTo - 1;
    }
    if (to > currentTo) {
      currentTo = to;
    }
  }

  answer += 4294967295 - currentTo;

  return answer;
}

console.log(main());
