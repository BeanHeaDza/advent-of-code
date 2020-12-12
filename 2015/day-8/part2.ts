import { readInput } from "../../common";

function main() {
  const input = readInput();
  let original = 0;
  let expanded = 0;

  for (const line of input) {
    original += line.length;
    expanded += JSON.stringify(line).length;
  }

  return expanded - original;
}

console.log(main());
