const fs = require("fs");

function readInput() {
  const content = fs.readFileSync("day-2/input.txt", { encoding: "utf8" });
  const lines = content.split("\n");
  return lines
    .filter((l) => l)
    .map((line) => {
      const matches = line.match(/(\d+)-(\d+) (\w): (\w+)/);
      return {
        min: +matches[1],
        max: +matches[2],
        char: matches[3],
        password: matches[4],
      };
    });
}

module.exports = { readInput };
