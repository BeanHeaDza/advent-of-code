import { readInput } from "../../common";

function main() {
  const input = readInput();
  let answer = 0;
  for (const line of input) {
    const [elf1, elf2] = line
      .split(",")
      .map((a) => a.split("-").map(Number))
      .sort((a, b) => a[0] - b[0]);

    answer += elf1[1] >= elf2[0] ? 1 : 0;
  }
  return answer;
}

console.log(main());
