import { readFileSync } from "fs";
import { normalize, resolve, sep } from "path";

export function readInput() {
  const stack = new Error().stack.split("\n");
  const compiledPath = stack[2].replace(/at .*\((.*):\d+:\d+\)/, "$1");
  const parts = resolve(compiledPath.trim()).split(sep);
  parts.splice(parts.lastIndexOf("out"), 1);
  const fileName = normalize(parts.join(sep) + "/../input.txt");

  const content = readFileSync(fileName, { encoding: "utf8" });
  const lines = content.split(/(?:\r\n|\r|\n)/g);
  if (lines[lines.length - 1] === "") {
    lines.length--;
  }

  return lines;
}

module.exports = { readInput };
