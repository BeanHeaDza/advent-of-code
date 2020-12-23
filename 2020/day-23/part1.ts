import { readInput } from "../../common";

function play(cups: number[]) {
  const removed = cups.splice(1, 3);

  let targetValue = cups[0] - 1;
  let targetIndex = cups.indexOf(targetValue);
  while (targetIndex === -1) {
    if (--targetValue < 1) {
      targetValue = cups.length + 3;
    }
    targetIndex = cups.indexOf(targetValue);
  }

  cups.splice(targetIndex + 1, 0, ...removed);

  const [first] = cups.splice(0, 1);
  cups.push(first);
}

function main() {
  const [input] = readInput();

  const cups = input.split("").map(Number);

  for (let x = 0; x < 100; x++) {
    play(cups);
  }

  let i = cups.indexOf(1);
  const answer = cups.slice(i + 1).join("") + cups.slice(0, i).join("");
  return answer;
}

console.log(main());
