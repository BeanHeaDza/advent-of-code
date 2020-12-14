import { sum } from "lodash";
import { getBits } from "./get-bits";
import { parseInstructions } from "./parse-instructions";

function readValue(mask: string, value: number) {
  const valueBits = getBits(value, mask.length);
  let output = "";

  for (let x = 0; x < mask.length; x++) {
    const c = mask[x];

    output += c === "X" ? valueBits[x] : c;
  }

  return Number.parseInt(output, 2);
}

function main() {
  const values: { [key: number]: number } = {};
  const input = parseInstructions();

  for (const inp of input) {
    for (const mem of inp.mem) {
      values[mem.addr] = readValue(inp.mask, mem.value);
    }
  }

  return sum(Object.values(values));
}

console.log(main());
