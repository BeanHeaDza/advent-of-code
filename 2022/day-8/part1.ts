import { readInput } from "../../common";

function main() {
  const input = readInput();
  const map = input.map((l) => l.split("").map(Number));

  const visable = ({ x, y }: { x: number; y: number }) => {
    const height = map[x][y];

    let blocked = 0;
    for (let iX = x - 1; iX >= 0; iX--) {
      if (map[iX][y] >= height) {
        blocked += 1;
        break;
      }
    }
    for (let iY = y - 1; iY >= 0; iY--) {
      if (map[x][iY] >= height) {
        blocked += 1;
        break;
      }
    }
    for (let iX = x + 1; iX < map.length; iX++) {
      if (map[iX][y] >= height) {
        blocked += 1;
        break;
      }
    }
    for (let iY = y + 1; iY < map[0].length; iY++) {
      if (map[x][iY] >= height) {
        blocked += 1;
        break;
      }
    }

    return blocked < 4;
  };

  return map
    .map((row, y) => row.map((_, x) => ({ x, y })))
    .flat()
    .filter(visable).length;
}

console.log(main());
