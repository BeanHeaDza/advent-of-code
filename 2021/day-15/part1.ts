import { readInput } from "../../common";
import { dijkstra } from "../../common/dijkstra";
import { get2dNeighbors } from "../../common/get-2d-neighbors";

function main() {
  const input = readInput().map((r) => r.split("").map(Number));
  const height = input.length;
  const width = input[0].length;

  const answer = dijkstra(
    "0,0",
    `${width - 1},${height - 1}`,
    function* (coord) {
      const [myX, myY] = coord.split(",").map(Number);
      for (const { x, y } of get2dNeighbors(width, height, myX, myY)) {
        yield [`${x},${y}`, input[y][x]];
      }
    }
  );

  return answer;
}

console.log(main());
