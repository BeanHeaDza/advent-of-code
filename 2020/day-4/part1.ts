import { parsePassports } from "./parse-passports";

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

function isValid(passport: { [key: string]: string }): boolean {
  const keys = Object.keys(passport);
  return requiredFields.every((f) => keys.includes(f));
}

function main() {
  const input = parsePassports();
  return input.filter((i) => isValid(i)).length;
}

console.log(main());
