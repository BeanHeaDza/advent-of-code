import { readInput } from "../../common/read-input";

enum Cardinal {
  north,
  east,
  south,
  west,
}

function main() {
  let input = readInput()[0].split(", ");

  let direction = Cardinal.north;
  let x = 0;
  let y = 0;

  for (const inst of input) {
    const turn = inst[0];
    const count = +inst.substr(1);

    if (turn === "R") {
      direction = (direction + 1) % 4;
    } else {
      direction = (direction + 3) % 4;
    }

    if (direction === Cardinal.north) {
      y += count;
    } else if (direction === Cardinal.east) {
      x += count;
    } else if (direction === Cardinal.south) {
      y -= count;
    } else if (direction === Cardinal.west) {
      x -= count;
    }
  }

  return Math.abs(x) + Math.abs(y);
}

console.log(main());
