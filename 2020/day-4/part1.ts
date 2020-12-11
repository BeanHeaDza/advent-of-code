import { readInput } from "../../common";

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

function isValid(passport) {
  const keys = Object.keys(passport);
  return requiredFields.every((f) => keys.includes(f));
}

function parsePassports(lines: string[]) {
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

function main() {
  const input = parsePassports(readInput());
  return input.filter((i) => isValid(i)).length;
}

console.log(main());
