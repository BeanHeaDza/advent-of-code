import { readInput } from "../../common";

function main() {
  const input = readInput();
  let answer = 0;
  const multipliers = input.map(() => 1);
  for (let i = 0; i < input.length; i++) {
    const thisCardCount = multipliers[i];
    answer += thisCardCount;
    const line = input[i];
    const [numbers] = line.split(": ").slice(1);
    const [winningStr, yoursStr] = numbers.split(" | ");
    const winning = new Set(
      winningStr
        .trim()
        .split(/\s+/g)
        .map((x) => +x)
    );
    const yours = new Set(
      yoursStr
        .trim()
        .split(/\s+/g)
        .map((x) => +x)
    );

    let count = 0;
    for (const x of yours) {
      if (winning.has(x)) {
        count++;
      }
    }
    for (let j = 0; j < count; j++) {
      multipliers[i + j + 1] += thisCardCount;
    }
  }
  return answer;
}

console.log(main());
