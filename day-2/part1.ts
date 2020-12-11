import { readInput } from "../common";

function isValid({ min, max, char, password }) {
  const occur = password.split("").filter((c) => c === char).length;
  return occur >= min && occur <= max;
}

function main() {
  const passwords = readInput()
    .filter((l) => l)
    .map((line) => {
      const matches = line.match(/(\d+)-(\d+) (\w): (\w+)/);
      return {
        min: +matches[1],
        max: +matches[2],
        char: matches[3],
        password: matches[4],
      };
    });
  return passwords.filter(isValid).length;
}

console.log(main());
