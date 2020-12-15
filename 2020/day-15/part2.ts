import { readInput } from "../../common";

function main() {
  const [input] = readInput();
  const numbers = input.split(",").map(Number);

  const lookup = new Map<number, number>(
    numbers.slice(0, numbers.length - 1).map((n, i) => [n, i])
  );

  const chain = [...numbers];

  while (chain.length < 30000000) {
    const index = chain.length - 1;
    const last = chain[index];
    const prevIndex = lookup.get(last);

    if (prevIndex === undefined) {
      chain.push(0);
    } else {
      chain.push(index - prevIndex);
    }

    lookup.set(last, index);
  }

  return chain[chain.length - 1];
}

console.log(main());
