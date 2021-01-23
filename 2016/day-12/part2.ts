import { readInput } from "../../common";

function main() {
  const input = readInput();
  const reg = { a: 0, b: 0, c: 1, d: 0 };

  for (let i = 0; i < input.length; i++) {
    const line = input[i];

    if (line.startsWith("cpy")) {
      const [from, to] = line.split(" ").slice(1);
      reg[to] = isNaN(+from) ? reg[from] : +from;
    } else if (line.startsWith("inc")) {
      const [r] = line.split(" ").slice(1);
      reg[r]++;
    } else if (line.startsWith("dec")) {
      const [r] = line.split(" ").slice(1);
      reg[r]--;
    } else if (line.startsWith("jnz")) {
      const [chk, offset] = line.split(" ").slice(1);
      if (reg[chk] !== 0) {
        i += Number(offset) - 1;
      }
    }
  }

  return reg.a;
}

console.log(main());
