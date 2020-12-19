import { sum } from "lodash";
import { getFactors, readInput } from "../../common";

function main() {
  const [input] = readInput().map(Number);

  let i = 0;
  while (sum(getFactors(++i)) * 10 < input) {}
  return i;
}

console.log(main());
