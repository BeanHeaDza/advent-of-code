import { countBy } from "lodash";
import { readInput } from "../../common";

function getName(n: string, id: number) {
  const a = "a".charCodeAt(0);
  const z = "z".charCodeAt(0);
  const l = z - a + 1;

  let answer = "";
  for (const c of n) {
    if (c === "-") {
      answer += " ";
      continue;
    }

    let x = c.charCodeAt(0);
    x = (x - a + id) % l;
    x += a;
    answer += String.fromCharCode(x);
  }

  return answer.trim();
}

function main() {
  const input = readInput();
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
    if (a === check && getName(n, id) === "northpole object storage") {
      return id;
    }
  }
}

console.log(main());
