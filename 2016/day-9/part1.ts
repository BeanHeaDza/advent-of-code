import { readInput } from "../../common";

function main() {
  const [input] = readInput();
  let i = input.indexOf("(");
  let adjustment = 0;
  while (i >= 0) {
    const m = /^\((\d+)x(\d+)\)/.exec(input.substr(i));
    adjustment += +m[1] * (+m[2] - 1);
    adjustment -= m[0].length;
    i += m[0].length + +m[1];
    i = input.indexOf("(", i);
  }

  return input.length + adjustment;
}

console.log(main());
