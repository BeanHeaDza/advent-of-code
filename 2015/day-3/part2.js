const { readInput } = require("../../common/read-file");

function move(houses, instructions) {
  let x = 0;
  let y = 0;

  for (const c of instructions) {
    if (c === "^") y++;
    else if (c === "v") y--;
    else if (c === "<") x--;
    else if (c === ">") x++;
    const key = `${x},${y}`;
    houses.set(key, houses.get(key) || 0);
  }
}

function main() {
  const [input] = readInput();
  const houses = new Map([["0,0", 1]]);

  move(houses, input.split("").filter((_, i) => i % 2 === 0));
  move(houses, input.split("").filter((_, i) => i % 2 === 1));

  return houses.size;
}

console.log(main());
