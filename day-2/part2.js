const { readInput } = require("./read-input");

function isValid({ min, max, char, password }) {
  const left = password[min - 1];
  const right = password[max - 1];

  let count = 0;
  count += left === char ? 1 : 0;
  count += right === char ? 1 : 0;

  return count === 1;
}

function main() {
  const passwords = readInput();
  return passwords.filter(isValid).length;
}

console.log("Part 2:", main());
