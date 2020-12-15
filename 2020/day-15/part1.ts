import { readInput } from "../../common";

function main() {
  const [input] = readInput();
  const numbers = input.split(",").map(Number);

  const chain = [...numbers];

  while (chain.length < 2020) {
    const last = chain[chain.length - 1];
    const matches = chain
      .map((n, i) => ({ n, i }))
      .filter(({ n }) => n === last);

    if (matches.length === 1) {
      chain.push(0);
    } else {
      chain.push(matches[matches.length - 1].i - matches[matches.length - 2].i);
    }
  }

  return chain[chain.length - 1];
}

console.log(main());
