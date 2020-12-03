const { readInput } = require("./read-input");

function getAtIndexFactory() {
  const lines = readInput();
  const width = lines[0].length;

  return function getAtIndex(x, y) {
    if (y < 0 || y >= lines.length || x < 0) {
      return undefined;
    }

    x = x % width;
    return lines[y][x];
  };
}

module.exports = { getAtIndexFactory };
