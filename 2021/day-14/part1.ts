import { groupBy, max, min } from "lodash";
import { readInput } from "../../common";

function main() {
  const input = readInput();
  let start = input[0];
  const react = new Map(
    input.slice(2).map((r) => r.split(" -> ") as [string, string])
  );

  for (let i = 0; i < 10; i++) {
    let matches: [number, string][] = [];
    for (const [key, v] of react) {
      let i = -2;
      while (i !== -1) {
        i = start.indexOf(key, i + 1);
        if (i >= 0) {
          matches.push([i + 1, v]);
        }
      }
    }
    let offset = 0;
    for (let [i, v] of matches.sort((a, b) => a[0] - b[0])) {
      i += offset++;
      start = start.slice(0, i) + v + start.slice(i);
    }
  }

  const grp = Object.values(groupBy(start.split(""))).map((g) => g.length);

  return max(grp) - min(grp);
}

console.log(main());
