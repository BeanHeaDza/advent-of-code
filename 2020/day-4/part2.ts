import { parsePassports } from "./parse-passports";

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
const validEyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

function between(x: string, min: number, max: number) {
  return !isNaN(+x) && +x >= min && +x <= max;
}

function validHeight(hgt: string) {
  const match = /(\d+)(in|cm)/g.exec(hgt);
  if (!match) {
    return false;
  }

  const [value, metric] = match.slice(1);
  if (metric === "cm") {
    return between(value, 150, 193);
  }
  if (metric === "in") {
    return between(value, 59, 76);
  }

  return false;
}

function isValid(passport: { [key: string]: string }): boolean {
  const keys = Object.keys(passport);
  if (!requiredFields.every((f) => keys.includes(f))) {
    return false;
  }

  const { byr, iyr, eyr, hgt, hcl, ecl, pid } = passport;

  if (!between(byr, 1920, 2002)) return false;
  if (!between(iyr, 2010, 2020)) return false;
  if (!between(eyr, 2020, 2030)) return false;
  if (!validHeight(hgt)) return false;
  if (!/^#[0-9a-f]{6}$/g.test(hcl)) return false;
  if (!validEyeColors.includes(ecl)) return false;
  if (!/^\d{9}$/g.test(pid)) return false;

  return true;
}

function main() {
  const input = parsePassports();
  return input.filter((i) => isValid(i)).length;
}

console.log(main());
