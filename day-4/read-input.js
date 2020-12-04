const fs = require("fs");

function readInput() {
  const content = fs.readFileSync("day-4/input.txt", { encoding: "utf8" });
  const lines = content.split("\n");

  const output = [];

  let current = {};

  for (const line of lines) {
    if (line === "") {
      output.push(current);
      current = {};
    } else {
      for (const pair of line.split(" ")) {
        const [key, value] = pair.split(":");
        current[key] = value;
      }
    }
  }

  return output;
}

module.exports = { readInput };
