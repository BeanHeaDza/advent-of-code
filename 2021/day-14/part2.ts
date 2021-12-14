import { Big } from "big.js";
import memoizee from "memoizee";
import { readInput } from "../../common";

function expanderFn(reactions: Map<string, string>) {
  let expander = memoizee((a: string, b: string, steps: number) => {
    if (steps === 0) {
      return a === b ? { [a]: Big(2) } : { [a]: Big(1), [b]: Big(1) };
    } else {
      const elem = reactions.get(a + b);
      const left = expander(a, elem, steps - 1);
      const right = expander(elem, b, steps - 1);
      let out: { [key: string]: Big } = {};
      for (const k of new Set([...Object.keys(left), ...Object.keys(right)])) {
        out[k] = (left[k] || Big(0)).add(right[k] || 0);
      }
      out[elem] = out[elem].minus(1);
      return out;
    }
  });
  return expander;
}

function main() {
  const input = readInput();
  let start = input[0];
  const react = new Map(
    input.slice(2).map((r) => r.split(" -> ") as [string, string])
  );

  let expander = expanderFn(react);

  let result: { [key: string]: Big } = {};
  for (let i = 0; i < start.length - 1; i++) {
    let r = expander(start[i], start[i + 1], 40);
    for (const k of Object.keys(r)) {
      result[k] = (result[k] || Big(0)).add(r[k]);
    }
    if (i > 0) {
      const c = start[i];
      result[c] = result[c].minus(1);
    }
  }
  let min = Big(Number.MAX_VALUE);
  let max = Big(Number.MIN_VALUE);
  for (const v of Object.values(result)) {
    if (v.lt(min)) {
      min = v;
    }
    if (v.gt(max)) {
      max = v;
    }
  }
  return max.minus(min).toString();
}

console.log(main());
