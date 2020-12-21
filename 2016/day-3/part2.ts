import { readInput } from "../../common";

function main() {
  const input = readInput();

  const t: number[][] = [];

  let left: number[] = [];
  let mid: number[] = [];
  let right: number[] = [];

  for (const line of input) {
    const [x, y, z] = line.trim().split(/\s+/).map(Number);

    left.push(x);
    mid.push(y);
    right.push(z);

    if (left.length === 3) {
      t.push(left, mid, right);
      left = [];
      mid = [];
      right = [];
    }
  }

  return t.map((c) => c.sort((a, b) => a - b)).filter(([x, y, z]) => x + y > z)
    .length;
}

console.log(main());
