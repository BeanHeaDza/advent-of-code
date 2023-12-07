import { parse } from "./parse";

function main() {
  const monkeys = parse(false);
  for (let x = 0; x < 10000; x++) {
    for (const monkey of monkeys) {
      monkey.inspect();
    }
    if ([1, 20, 1000].includes(x + 1)) {
      console.log(`== After round ${x + 1} ==`);
      monkeys.forEach((m, i) =>
        console.log(`Monkey ${i} inspected items ${m.inspections} times.`)
      );
      console.log();
    }
  }
  return monkeys
    .map((m) => m.inspections)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((v, n) => v * n, 1);
}

console.log(main());
