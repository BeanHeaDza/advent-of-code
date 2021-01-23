import { readInput } from "../../common";

function parse(lines: string[]) {
  const getGenerators = (line: string) =>
    (line.match(/\w+ gen/g) || []).map((m) => m[0] + "g");
  const getChips = (line: string) =>
    (line.match(/\w+-comp/g) || []).map((m) => m[0] + "m");

  return lines.map((l) => [...getGenerators(l), ...getChips(l)]);
}

function main() {
  const input = parse(readInput());

  let answer = 3;
  answer += (input[0].length - 2) * 6;
  answer += input[1].length * 4;
  answer += input[2].length * 2;
  return answer;
}

console.log(main());
