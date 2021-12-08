import { readInput } from "../../common";

function main() {
  let answer = 0;
  for (const line of readInput()) {
    const [, right] = line.split(" | ");

    const output = right.trim().split(" ");
    const target = new Set([2, 4, 3, 7]);

    for (const item of output) {
      if (target.has(item.length)) {
        answer++;
      }
    }
  }

  return answer;
}

console.log(main());
