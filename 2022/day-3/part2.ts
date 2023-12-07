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

function* combineThree(input: string[]) {
  let buffer: Set<number>[] = [];
  for (const rugsack of input) {
    if (buffer.length === 3) {
      yield buffer;
      buffer = [];
    }
    buffer.push(new Set(rugsack.split("").map(getPriority)));
  }
  if (buffer.length) {
    yield buffer;
  }
}

function main() {
  const input = readInput();
  let sum = 0;
  for (const [bag1, bag2, bag3] of combineThree(input)) {
    for (const p of bag1) {
      if (bag2.has(p) && bag3.has(p)) {
        sum += p;
        break;
      }
    }
  }
  return sum;
}

console.log(main());
