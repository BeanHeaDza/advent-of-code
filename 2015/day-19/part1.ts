import { readInput } from "../../common";

function main() {
  const input = readInput();

  const start = input[input.length - 1];
  const replacements = input
    .slice(0, input.length - 2)
    .map((i) => i.split(" => "));

  const variations = new Set<string>();

  for (const [from, to] of replacements) {
    let lastIndex = start.indexOf(from);
    while (lastIndex != -1) {
      variations.add(
        `${start.substr(0, lastIndex)}${to}${start.substr(
          lastIndex + from.length
        )}`
      );

      lastIndex = start.indexOf(from, lastIndex + 1);
    }
  }

  return variations.size;
}

console.log(main());
