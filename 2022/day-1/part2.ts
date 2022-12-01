import { sum } from "lodash";
import { readInput } from "../../common";

function main() {
  const input = readInput();
  const elfs = input
    .join("\n")
    .split("\n\n")
    .map((elf) => sum(elf.split("\n").map(Number)))
    .sort((a, b) => b - a);

  return sum(elfs.slice(0, 3));
}

console.log(main());
