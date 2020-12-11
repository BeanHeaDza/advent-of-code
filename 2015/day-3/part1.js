const { readInput } = require("../../common/read-file");

function main() {
  const [input] = readInput();
  const houses = new Map();

  let x = 0;
  let y = 0;

  for (const c of input.split("")) {
    const key = `${x},${y}`;
    houses.set(key, houses.get(key) || 0);
    if (c === "^") y++;
    else if (c === "v") y--;
    else if (c === "<") x--;
    else if (c === ">") x++;
  }

  return houses.size;
}

console.log(main());
