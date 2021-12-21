import Big from "big.js";
import memoizee from "memoizee";
import { readInput } from "../../common";
import { combinations } from "../../common/combinations-generator";

function solveFn() {
  const combos = [...combinations([1, 2, 3], 3, true, true)];
  const solve = memoizee(
    (
      p1: number,
      p2: number,
      s1: number,
      s2: number,
      player1ToGo: boolean
    ): { p1: Big; p2: Big } => {
      let total = { p1: Big(0), p2: Big(0) };
      if (player1ToGo) {
        for (const [r1, r2, r3] of combos) {
          let nP1 = p1 + r1 + r2 + r3;
          if (nP1 > 10) {
            nP1 -= 10;
          }
          if (nP1 + s1 >= 21) {
            total.p1 = total.p1.add(1);
          } else {
            const child = solve(nP1, p2, s1 + nP1, s2, false);
            total.p1 = total.p1.add(child.p1);
            total.p2 = total.p2.add(child.p2);
          }
        }
      } else {
        for (const [r1, r2, r3] of combos) {
          let nP2 = p2 + r1 + r2 + r3;
          if (nP2 > 10) {
            nP2 -= 10;
          }
          if (nP2 + s2 >= 21) {
            total.p2 = total.p2.add(1);
          } else {
            const child = solve(p1, nP2, s1, s2 + nP2, true);
            total.p1 = total.p1.add(child.p1);
            total.p2 = total.p2.add(child.p2);
          }
        }
      }
      return total;
    }
  );
  return solve;
}

function main() {
  let [i1, i2] = readInput().map((l) => +l[l.length - 1]);
  const solve = solveFn();
  const { p1, p2 } = solve(i1, i2, 0, 0, true);
  return p1.gt(p2) ? p1.toString() : p2.toString();
}

console.log(main());
