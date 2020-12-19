import { sum } from "lodash";
import { readInput } from "../../common";

function doBracketsFirst(line: string) {
  let m = /\([^\(\)]+\)/.exec(line);
  while (m) {
    let value = math(m[0].substr(1, m[0].length - 2));
    line = line.substr(0, m.index) + value + line.substr(m.index + m[0].length);
    m = /\([^\(\)]+\)/.exec(line);
  }
  return math(line);
}

function math(line: string) {
  while (!/^\d+$/.test(line)) {
    let match = /(\d+) \+ (\d+)/.exec(line);
    let val: number;
    if (match) {
      val = +match[1] + +match[2];
    } else {
      match = /(\d+) \* (\d+)/.exec(line);
      val = +match[1] * +match[2];
    }

    if (match) {
      line =
        line.substr(0, match.index) +
        val +
        line.substr(match.index + match[0].length);
    }
  }

  return +line;
}

function main() {
  const input = readInput();

  return sum(input.map(doBracketsFirst));
}

console.log(main());
