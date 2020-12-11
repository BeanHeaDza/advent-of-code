import { readInput } from "../../common";

function isValid({ min, max, char, password }) {
  const left = password[min - 1];
  const right = password[max - 1];

  let count = 0;
  count += left === char ? 1 : 0;
  count += right === char ? 1 : 0;

  return count === 1;
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
