import { readInput } from "../../common";

function main() {
  const input = readInput();
  let answer = 0;
  for (const line of input) {
    let sVal = "";
    let m = /\d/.exec(line);
    sVal += m[0];
    m = /\d/.exec(line.split("").reverse().join());
    sVal += m[0];
    answer += +sVal;
  }
  return answer;
}

console.log(main());
