import { sum } from "lodash";
import { readInput } from "../../common";

function main() {
  const input = readInput()[0].split(",").map(Number);
  let answer = Number.MAX_VALUE;
  let target = Math.round(sum(input) / input.length);
  while (true) {
    let temp = sum(input.map((i) => Math.abs(target - i - 1)));
    let temp2 = sum(input.map((i) => Math.abs(target - i + 1)));
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
