import { permutations } from "../../common/permutations";
import { readMap } from "./read-map";

function main() {
  const map = readMap();

  let answer = Infinity;
  for (const path of permutations([...map.keys()])) {
    let current = path[0];
    let distance = 0;

    for (let x = 1; x < path.length; x++) {
      const next = path[x];
      distance += map.get(current).get(next);
      current = next;
    }

    if (distance < answer) {
      answer = distance;
    }
  }

  return answer;
}

console.log(main());
