import { permutations } from "../../common/permutations";
import { parseHappiness } from "./parse-happiness";

function main() {
  const { happinessMap, people } = parseHappiness();

  let answer = -Infinity;
  for (const order of permutations(people)) {
    let happiness = 0;
    for (let x = 0; x < order.length; x++) {
      const person = order[x];
      const left = order[x > 0 ? x - 1 : order.length - 1];
      const right = order[x + 1 < order.length ? x + 1 : 0];
      happiness += happinessMap.get(`${person},${left}`);
      happiness += happinessMap.get(`${person},${right}`);
    }

    if (happiness > answer) {
      answer = happiness;
    }
  }

  return answer;
}

console.log(main());
