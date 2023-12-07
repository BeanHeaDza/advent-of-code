import { parse } from "./parse";

function main() {
  const monkeys = parse();
  for (let x = 0; x < 20; x++) {
    for (const monkey of monkeys) {
      monkey.inspect();
    }
  }
  return monkeys
    .map((m) => m.inspections)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((v, n) => v * n, 1);
}

console.log(main());
