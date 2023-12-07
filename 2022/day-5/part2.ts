import { readInput } from "../../common";
import { parse } from "./parse";

function main() {
  const input = readInput();
  const { stacks, moves } = parse(input);

  for (const { from, to, count } of moves) {
    const temp = stacks[from].splice(stacks[from].length - count);
    stacks[to] = [...stacks[to], ...temp];
  }
  return stacks.map(lastItem).join("");
}

function lastItem(stack: string[]) {
  return stack[stack.length - 1];
}

console.log(main());
