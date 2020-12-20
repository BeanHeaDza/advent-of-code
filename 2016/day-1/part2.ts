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

  let ansX = NaN;
  let ansY = NaN;

  const visited = new Set([`${x},${y}`]);

  const visit = (x: number, y: number) => {
    if (!isNaN(ansX)) return;

    const key = `${x},${y}`;
    if (visited.has(key)) {
      ansX = x;
      ansY = y;
    }
    visited.add(key);
  };

  for (const inst of input) {
    const turn = inst[0];
    let count = +inst.substr(1);

    if (turn === "R") {
      direction = (direction + 1) % 4;
    } else {
      direction = (direction + 3) % 4;
    }

    if (direction === Cardinal.north) {
      while (count--) {
        visit(x, --y);
      }
    } else if (direction === Cardinal.east) {
      while (count--) {
        visit(++x, y);
      }
    } else if (direction === Cardinal.south) {
      while (count--) {
        visit(x, ++y);
      }
    } else if (direction === Cardinal.west) {
      while (count--) {
        visit(--x, y);
      }
    }
    if (!isNaN(ansX)) {
      break;
    }
  }

  return Math.abs(ansX) + Math.abs(ansY);
}

console.log(main());
