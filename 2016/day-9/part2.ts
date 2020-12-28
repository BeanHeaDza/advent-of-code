import { readInput } from "../../common";

function decompressLength(input: string) {
  let i = input.indexOf("(");
  let adjustment = 0;
  while (i >= 0) {
    const m = /^\((\d+)x(\d+)\)/.exec(input.substr(i));
    const compressedLength = m[0].length + +m[1];
    const innerLength = decompressLength(input.substr(i + m[0].length, +m[1]));
    adjustment += innerLength * +m[2];
    adjustment -= compressedLength;
    i += compressedLength;
    i = input.indexOf("(", i);
  }

  return input.length + adjustment;
}

function main() {
  const [input] = readInput();
  return decompressLength(input);
}

console.log(main());
