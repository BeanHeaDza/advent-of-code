import { readInput } from "../../common";

function main() {
  const input = readInput();
  let answer = 0;
  for (const line of input) {
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

    let score = 0;
    for (const x of yours) {
      if (winning.has(x)) {
        score = score ? score * 2 : 1;
      }
    }

    answer += score;
  }
  return answer;
}

console.log(main());
