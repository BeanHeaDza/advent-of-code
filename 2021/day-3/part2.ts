import { sum } from "lodash";
import { readInput } from "../../common";

function solve(parts: string[], reverse = false) {
  const left = reverse ? "1" : "0";
  const right = reverse ? "0" : "1";
  for (let i = 0; i < parts[0].length; i++) {
    const commonPath =
      sum(parts.map((p) => +p.substr(i, 1))) >= parts.length / 2 ? left : right;
    parts = parts.filter((p) => p.substr(i, 1) === commonPath);
    if (parts.length === 1) {
      return parts[0];
    }
  }
}

function main() {
  const input = readInput();
  return parseInt(solve(input), 2) * parseInt(solve(input, true), 2);
}

console.log(main());
