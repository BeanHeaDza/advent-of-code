import { sum } from "lodash";
import { getFactors, readInput } from "../../common";

function sumPresents(num: number) {
  const factors = getFactors(num).filter((f) => num / f <= 50);
  return sum(factors) * 11;
}

function main() {
  const [input] = readInput().map(Number);

  let i = 0;
  while (sumPresents(++i) < input) {}
  return i;
}

console.log(main());
