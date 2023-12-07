import { readInput } from "../../common";
const NUMBERS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function main() {
  const input = readInput();
  let answer = 0;
  for (let line of input) {
    let left = "";
    let right = "";
    let bestLeftIndex = Number.POSITIVE_INFINITY;
    let bestRightIndex = -1;
    for (let i = 0; i < NUMBERS.length; i++) {
      let leftIndex = line.indexOf(NUMBERS[i]);
      let rightIndex = line.lastIndexOf(NUMBERS[i]);
      if (leftIndex < bestLeftIndex) {
        left = "" + i;
        bestLeftIndex = leftIndex;
      }
      if (rightIndex > bestRightIndex) {
        right = "" + i;
        bestRightIndex = rightIndex;
      }
    }
    let m = /\d/.exec(line);
    if (m.index < bestLeftIndex) {
      left = m[0];
    }
    m = /.*\d/.exec(line);
    if (m[0].length - 1 > bestRightIndex) {
      right = m[0][m[0].length - 1];
    }
    answer += +(left + right);
  }
  return answer;
}

console.log(main());
