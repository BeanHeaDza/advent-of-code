import { max, sum } from "lodash";
import { readInput } from "../../common";

function main() {
  const input = readInput();
  const elfs = input
    .join("\n")
    .split("\n\n")
    .map((elf) => sum(elf.split("\n").map(Number)));

  return max(elfs);
}

console.log(main());
