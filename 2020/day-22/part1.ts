import { sum } from "lodash";
import { readInput } from "../../common";

function main() {
  const input = readInput();
  const [p1, p2] = input
    .join("\n")
    .split("\n\n")
    .map((d) =>
      d
        .split("\n")
        .map(Number)
        .filter((n) => !isNaN(n))
    );

  while (p1.length > 0 && p2.length > 0) {
    const [c1] = p1.splice(0, 1);
    const [c2] = p2.splice(0, 1);
    if (c1 > c2) {
      p1.push(c1, c2);
    } else {
      p2.push(c2, c1);
    }
  }

  return sum(p2.map((c, i) => (p2.length - i) * c));
}

console.log(main());
