const fs = require("fs");
const path = require("path");

function readInput() {
  const content = fs.readFileSync(path.resolve(__dirname, "input.txt"), {
    encoding: "utf8",
  });
  const lines = content.split("\n");

  return lines;
}

module.exports = { readInput };
