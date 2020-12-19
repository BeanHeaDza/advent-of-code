import { sum } from "lodash";
import { readInput } from "../../common";

function math(line: string) {
  while (!/^\d+$/.test(line)) {
    const normalMatch = /(\d+) (\+|\*) (\d+)/.exec(line);
    let val: number;
    if (normalMatch) {
      if (normalMatch[2] === "+") {
        val = +normalMatch[1] + +normalMatch[3];
      } else {
        val = +normalMatch[1] * +normalMatch[3];
      }
      line =
        line.substr(0, normalMatch.index) +
        val +
        line.substr(normalMatch.index + normalMatch[0].length);
    }

    line = line.replace(/\((\d+)\)/g, "$1");
  }

  return +line;
}

function main() {
  const input = readInput();

  return sum(input.map(math));
}

console.log(main());
