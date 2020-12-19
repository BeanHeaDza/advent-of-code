import { sum } from "lodash";
import { readInput } from "../../common";

function* solvePassenger(
  input: number[],
  target: number,
  answer: { length: number; qe: number },
  i = input.length - 1,
  boxCount = 0
): Generator<number[]> {
  if (boxCount > answer.length) {
    return;
  }
  while (input[i] > target) {
    i--;
  }

  if (i < 0) {
    return;
  }

  if (input[i] === target) {
    yield [input[i]];
  }

  for (const boxes of solvePassenger(
    input,
    target - input[i],
    answer,
    i - 1,
    boxCount + 1
  )) {
    yield [input[i], ...boxes];
  }
  yield* solvePassenger(input, target, answer, i - 1, boxCount + 1);
}

function main() {
  const input = readInput().map(Number);
  const total = sum(input);
  const target = total / 4;

  let answer = { length: Infinity, qe: Infinity };

  for (const boxes of solvePassenger(input, target, answer)) {
    const newQe = boxes.reduce((product, x) => product * x, 1);
    if (answer.length > boxes.length) {
      answer.length = boxes.length;
      answer.qe = newQe;
    } else {
      if (answer.qe > newQe) {
        answer.qe = newQe;
      }
    }
  }

  return answer.qe;
}

console.log(main());
