import { readInput } from "../../common";

function getPriority(c: string) {
  const charCode = c.charCodeAt(0);
  const lowerA = "a".charCodeAt(0);
  const lowerZ = "z".charCodeAt(0);
  const capitalA = "A".charCodeAt(0);
  return charCode >= lowerA && charCode <= lowerZ
    ? charCode - lowerA + 1
    : charCode - capitalA + 27;
}

function main() {
  const input = readInput();
  let sum = 0;
  for (const rugsack of input) {
    const priorities = rugsack.split("").map(getPriority);
    const left = new Set(priorities.slice(0, priorities.length / 2));
    const right = new Set(priorities.slice(priorities.length / 2));
    sum += Array.from(left).find((p) => right.has(p));
  }
  return sum;
}

console.log(main());
