import { readInput } from "../../common";

function main() {
  const input = readInput();
  const times = [...input[0].replaceAll(" ", "").matchAll(/\d+/g)].map(
    (m) => +m[0]
  );
  const distances = [...input[1].replaceAll(" ", "").matchAll(/\d+/g)].map(
    (m) => +m[0]
  );
  let answer = 1;
  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const distance = distances[i];
    let winnings = 0;
    for (let x = 1; x < time; x++) {
      const myDistance = x * (time - x);
      if (myDistance > distance) {
        winnings += 1;
      }
    }
    answer *= winnings;
  }
  return answer;
}

console.log(main());
