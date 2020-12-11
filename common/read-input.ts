import { readFileSync } from "fs";
import { resolve } from "path";

export function readInput() {
  const stack = new Error().stack.split("\n");
  const root = stack[2]
    .replace(/ *at .* \((.*)\/.*\.(?:ts|js):\d+:\d+\)$/g, "$1")
    .replace("/out", "");
  const fileName = resolve(root, "input.txt");

  const content = readFileSync(fileName, { encoding: "utf8" });
  const lines = content.split("\n");
  if (lines[lines.length - 1] === "") {
    lines.length--;
  }

  return lines;
}

module.exports = { readInput };
