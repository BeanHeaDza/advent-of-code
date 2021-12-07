import { sum } from "lodash";
import { readInput } from "../../common";

function solve(input: number[], target: number) {
  let total = 0;
  for (let i of input) {
    let inc = 1;
    while (i < target) {
      i++;
      total += inc++;
    }
    while (i > target) {
      i--;
      total += inc++;
    }
  }
  return total;
}

function main() {
  const input = readInput()[0].split(",").map(Number);
  let answer = Number.MAX_VALUE;
  let target = Math.round(sum(input) / input.length);
  while (true) {
    let temp = solve(input, target - 1);
    let temp2 = solve(input, target + 1);
    if (temp < answer) {
      answer = temp;
      target--;
    } else if (temp2 < answer) {
      answer = temp2;
      target++;
    } else {
      return answer;
    }
  }
}

console.log(main());
