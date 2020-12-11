import { readInput } from "../../common";

function run(lines: string[]) {
  const usedInstructions = [];
  let acc = 0;
  let index = 0;

  while (index < lines.length) {
    if (usedInstructions.includes(index)) {
      return undefined;
    }
    usedInstructions.push(index);

    const [inst, num] = lines[index].split(" ");

    if (inst === "nop") {
      index++;
    } else if (inst === "acc") {
      acc += Number(num);
      index++;
    } else if (inst === "jmp") {
      index += Number(num);
    }

    if (index > lines.length) {
      return undefined;
    }
  }
  return acc;
}

function main() {
  const input = readInput();

  for (let x = 0; x < input.length; x++) {
    const [inst, num] = input[x].split(" ");
    let answer = undefined;
    if (inst === "nop") {
      answer = run([...input.slice(0, x), `jmp ${num}`, ...input.slice(x + 1)]);
    } else if (inst === "jmp") {
      answer = run([...input.slice(0, x), `nop ${num}`, ...input.slice(x + 1)]);
    }
    if (answer !== undefined) {
      return answer;
    }
  }
}

console.log(main());
