import { readInput } from "../../common";
import { parse } from "./parse";

function main() {
  const input = readInput();
  const { stacks, moves } = parse(input);

  for (const { from, to, count } of moves) {
    for (let x = 0; x < count; x++) {
      stacks[to].push(stacks[from].pop());
    }
  }
  return stacks.map(lastItem).join("");
}

function lastItem(stack: string[]) {
  return stack[stack.length - 1];
}

console.log(main());
