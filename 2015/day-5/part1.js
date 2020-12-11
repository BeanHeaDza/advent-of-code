const { readInput } = require("../../common/read-file");

function isNice(line) {
  if (line.split("").filter((x) => /[aeiou]/.test(x)).length < 3) return false;
  if (!/(\w)\1/.test(line)) return false;
  if (/ab|cd|pq|xy/.test(line)) return false;

  return true;
}

function main() {
  const input = readInput();
  return input.filter(isNice).length;
}

console.log(main());
