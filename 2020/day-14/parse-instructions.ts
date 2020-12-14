import { readInput } from "../../common";

interface IInstruction {
  mask: string;
  mem: { addr: number; value: number }[];
}

export function parseInstructions() {
  const lines = readInput();
  lines.push("mask");

  let mask: string;
  let mem: { addr: number; value: number }[] = [];
  let output: IInstruction[] = [];
  for (const line of lines) {
    const [left, right] = line.split(" = ");
    if (left === "mask") {
      if (mask) {
        output.push({ mask, mem });
      }
      mask = right;
      mem = [];
    } else {
      mem.push({ addr: +left.replace(/mem\[(\d+)\]/, "$1"), value: +right });
    }
  }

  return output;
}
