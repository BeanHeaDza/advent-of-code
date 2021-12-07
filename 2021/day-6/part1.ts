import { sum } from "lodash";
import { readInput } from "../../common";

function main() {
  const input = readInput()[0].split(",").map(Number);
  const map = [];
  for (let x = 0; x < 9; x++) {
    map[x] = input.filter((i) => i === x).length;
  }

  for (let d = 0; d < 80; d++) {
    map[7] += map[0];
    map[9] = map[0];
    for (let i = 1; i < map.length; i++) {
      map[i - 1] = map[i] || 0;
    }
    map[9] = 0;
  }

  return sum(map);
}

console.log(main());
