const fs = require("fs");
const path = require("path");

function readInput() {
  const stack = new Error().stack.split("\n");
  const root = stack[2].replace(/ *at .* \((.*)\/.*\.js:\d+:\d+\)$/g, "$1");
  const fileName = path.resolve(root, "input.txt");

  const content = fs.readFileSync(fileName, { encoding: "utf8" });
  const lines = content.split("\n");
  if (lines[lines.length - 1] === "") {
    lines.length--;
  }

  return lines;
}

module.exports = { readInput };
