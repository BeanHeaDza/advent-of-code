const fs = require("fs");

function readInput() {
  const content = fs.readFileSync("day-5/input.txt", { encoding: "utf8" });
  const lines = content.split("\n");

  return lines;
}

module.exports = { readInput };
