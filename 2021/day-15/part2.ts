import { readInput } from "../../common";
import { dijkstra } from "../../common/dijkstra";
import { get2dNeighbors } from "../../common/get-2d-neighbors";

function main() {
  const input = readInput();
  const map = expand(input);
  const height = map.length;
  const width = map[0].length;

  const answer = dijkstra(
    "0,0",
    `${width - 1},${height - 1}`,
    function* (coord) {
      const [myX, myY] = coord.split(",").map(Number);
      for (const { x, y } of get2dNeighbors(width, height, myX, myY)) {
        yield [`${x},${y}`, map[y][x]];
      }
    }
  );

  return answer;
}

console.log(main());

function expand(input: string[]) {
  const init = input.map((l) => l.split("").map(Number));
  const height = input.length;
  const width = input[0].length;
  const output: number[][] = [];
  for (let y = 0; y < init.length * 5; y++) {
    const row: number[] = [];
    output.push(row);
    for (let x = 0; x < init[0].length * 5; x++) {
      const add = Math.floor(y / height) + Math.floor(x / width);
      const value = (init[y % height][x % width] + add) % 9;
      row.push(value === 0 ? 9 : value);
    }
  }
  return output;
}
