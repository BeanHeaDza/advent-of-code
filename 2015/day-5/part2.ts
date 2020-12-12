import { readInput } from "../../common";

function isNice(line: string) {
  if (!/(\w\w).*\1/.test(line)) return false;
  if (!/(\w).\1/.test(line)) return false;

  return true;
}

function main() {
  const input = readInput();
  return input.filter(isNice).length;
}

console.log(main());
