import { readInput } from "../../common";

function main() {
  const input = readInput();
  let inCode = 0;
  let inMemory = 0;

  for (const line of input) {
    inCode += line.length;
    inMemory += eval(line).length;
  }

  return inCode - inMemory;
}

console.log(main());
