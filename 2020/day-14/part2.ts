import { sum } from "lodash";
import { getBits } from "./get-bits";
import { parseInstructions } from "./parse-instructions";

function getAddresses(mask: string, inAddr: number) {
  const valueBits = getBits(inAddr, mask.length);
  let resultMask = "";
  const addresses: number[] = [];

  for (let x = 0; x < mask.length; x++) {
    const c = mask[x];
    if (c === "0") {
      resultMask += valueBits[x];
    } else {
      resultMask += c;
    }
  }

  const xCount = resultMask.split("").filter((c) => c === "X").length;
  const top = Math.pow(2, xCount);

  for (let x = 0; x < top; x++) {
    const xArr = getBits(x, xCount).split("").reverse();

    let newAddress = "";
    for (let y = 0; y < resultMask.length; y++) {
      const o = resultMask[y];
      if (o === "X") {
        newAddress += xArr.pop();
      } else {
        newAddress += o;
      }
    }

    addresses.push(Number.parseInt(newAddress, 2));
  }

  return addresses;
}

function main() {
  let values: { [key: number]: number } = {};
  const input = parseInstructions();

  for (const inp of input) {
    for (const mem of inp.mem) {
      for (const addr of getAddresses(inp.mask, mem.addr)) {
        values[addr] = mem.value;
      }
    }
  }

  return sum(Object.values(values));
}

console.log(main());
