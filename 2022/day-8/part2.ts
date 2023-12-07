import { max } from "lodash";
import { readInput } from "../../common";

function main() {
  const input = readInput();
  const map = input.map((l) => l.split("").map(Number));

  const score = ({ x, y }: { x: number; y: number }) => {
    const height = map[x][y];

    let product = 1;
    let temp = 0;
    for (let iX = x - 1; iX >= 0; iX--) {
      temp++;
      if (map[iX][y] >= height) {
        break;
      }
    }
    product *= temp;
    temp = 0;
    for (let iY = y - 1; iY >= 0; iY--) {
      temp++;
      if (map[x][iY] >= height) {
        break;
      }
    }
    product *= temp;
    temp = 0;
    for (let iX = x + 1; iX < map.length; iX++) {
      temp++;
      if (map[iX][y] >= height) {
        break;
      }
    }
    product *= temp;
    temp = 0;
    for (let iY = y + 1; iY < map[0].length; iY++) {
      temp++;
      if (map[x][iY] >= height) {
        break;
      }
    }
    product *= temp;

    return product;
  };

  return max(
    map.map((row, y) => row.map((_, x) => ({ x, y })).map(score)).flat()
  );
}

console.log(main());
