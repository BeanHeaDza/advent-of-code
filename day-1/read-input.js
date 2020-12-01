const fs = require("fs");

function readInput() {
  const content = fs.readFileSync("day-1/input.txt", { encoding: "utf8" });
  return content.split("\n").map(Number);
}

module.exports = { readInput };
