import { readInput } from "../../common";

function main() {
  const input = readInput();
  let pos = 0;
  let depth = 0;
  for (const command of input) {
    const [action, num] = command.split(' ');
    if (action === 'forward') {
      pos += +num;
    } else if (action === 'down') {
      depth += +num;
    } else {
      depth -= +num;
    }
  }
  return pos * depth;
}

console.log(main());
