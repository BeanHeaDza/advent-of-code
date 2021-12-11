import { readInput } from "../../common";

function main() {
  let input = +readInput()[0];
  let answer = 1;
  let i = 0;
  while (input > 1) {
    i++;
    if (input % 2 === 0) {
      input /= 2;
    } else {
      input = Math.floor(input / 2);
      answer += Math.pow(2, i);
    }
  }
  return answer;
}

console.log(main());
