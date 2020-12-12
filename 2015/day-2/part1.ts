import { readInput } from "../../common";

function main() {
  const input = readInput();

  let total = 0;
  for (const [l, w, h] of input.map((l) => l.split("x").map(Number))) {
    const lw = l * w;
    const lh = l * h;
    const wh = w * h;
    const smallest = Math.min(lw, lh, wh);
    total += lw * 2 + lh * 2 + wh * 2 + smallest;
  }
  return total;
}

console.log(main());
