import { sum } from "lodash";
import { readInput } from "../../common";

function play(p1: number[], p2: number[]) {
  const prevRounds = new Set<string>();

  while (p1.length > 0 && p2.length > 0) {
    const key = p1.join(",") + ";" + p2.join(",");
    if (prevRounds.has(key)) {
      return p1;
    }
    prevRounds.add(key);

    const [c1] = p1.splice(0, 1);
    const [c2] = p2.splice(0, 1);

    if (p1.length >= c1 && p2.length >= c2) {
      const tp1 = p1.slice(0, c1);
      const tp2 = p2.slice(0, c2);
      const winner = play(tp1, tp2);

      if (winner === tp1) {
        p1.push(c1, c2);
      } else {
        p2.push(c2, c1);
      }
    } else {
      if (c1 > c2) {
        p1.push(c1, c2);
      } else {
        p2.push(c2, c1);
      }
    }
  }

  return p1.length === 0 ? p2 : p1;
}

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

  let winner = play(p1, p2);

  return sum(winner.map((c, i) => (p2.length - i) * c));
}

console.log(main());
