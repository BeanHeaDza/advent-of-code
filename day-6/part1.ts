import { readInput } from "../common";

function main() {
  const input = [...readInput(), ""];

  const output = [];

  let current = new Set<string>();

  for (const line of input) {
    if (line === "") {
      output.push([...current]);
      current = new Set();
    } else {
      for (const answer of line.split("")) {
        current.add(answer);
      }
    }
  }

  if (current.size > 0) {
    output.push([...current]);
  }

  return output.map((i) => i.length).reduce((sum, v) => sum + v, 0);
}

console.log(main());
