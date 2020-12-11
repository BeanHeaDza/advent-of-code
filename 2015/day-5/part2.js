const { readInput } = require("../../common/read-file");

function isNice(line) {
  if (!/(\w\w).*\1/.test(line)) return false;
  if (!/(\w).\1/.test(line)) return false;

  return true;
}

function main() {
  const input = readInput();
  return input.filter(isNice).length;
}

console.log(main());
