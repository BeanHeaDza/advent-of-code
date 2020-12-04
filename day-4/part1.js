const { readInput } = require("./read-input");

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

function isValid(passport) {
  const keys = Object.keys(passport);
  return requiredFields.every((f) => keys.includes(f));
}

function main() {
  const input = readInput();
  return input.filter((i) => isValid(i)).length;
}

console.log("Part 1:", main());
