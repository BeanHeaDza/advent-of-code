import { countBy } from "lodash";
import { readInput } from "../../common";

function main() {
  const input = readInput();
  let ans = 0;
  for (const line of input) {
    const m = /(.*?)(\d+)\[(.*)\]/.exec(line);
    const n = m[1];
    const id = +m[2];
    const check = m[3];

    const g = countBy(n);
    delete g["-"];

    const s = Object.keys(g).sort(
      (a, b) => (g[b] - g[a]) * 100000 + a.localeCompare(b)
    );

    const a = s.slice(0, check.length).join("");
    if (a === check) {
      ans += id;
    }
  }

  return ans;
}

console.log(main());
