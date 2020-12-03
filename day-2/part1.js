const { readInput } = require("./read-input");

function isValid({ min, max, char, password }) {
  const occur = password.split("").filter((c) => c === char).length;
  return occur >= min && occur <= max;
}

function main() {
  const passwords = readInput();
  return passwords.filter(isValid).length;
}

console.log("Part 1:", main());
