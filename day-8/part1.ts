import { readInput } from "../common";

function main() {
  const input = readInput();
  const usedInstructions = [];
  let acc = 0;
  let index = 0;

  while (index < input.length) {
    if (usedInstructions.includes(index)) {
      return acc;
    }
    usedInstructions.push(index);

    const [inst, num] = input[index].split(" ");

    if (inst === "nop") {
      index++;
    } else if (inst === "acc") {
      acc += Number(num);
      index++;
    } else if (inst === "jmp") {
      index += Number(num);
    }
  }
}

console.log(main());
