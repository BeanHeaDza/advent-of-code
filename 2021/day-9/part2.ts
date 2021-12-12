import { readInput } from "../../common";

function main() {
  const input = readInput().map((l) => l.split("").map(Number));
  const get = (x: number, y: number) => {
    if (x < 0 || y < 0 || x >= input.length) {
      return Number.POSITIVE_INFINITY;
    }
    const row = input[x];
    return y < row.length ? row[y] : Number.POSITIVE_INFINITY;
  };

  let basins = [];
  const lowPoints: [number, number][] = [];
  for (let x = 0; x < input.length; x++) {
    const row = input[x];
    for (let y = 0; y < row.length; y++) {
      const c = row[y];
      const minSide = Math.min(
        get(x + 1, y),
        get(x - 1, y),
        get(x, y + 1),
        get(x, y - 1)
      );
      if (c < minSide) {
        lowPoints.push([x, y]);
      }
    }
  }

  let touched = new Set<string>();
  for (const lowPoint of lowPoints) {
    let count = 0;
    let todo = [lowPoint];
    let next: [number, number];
    while ((next = todo.pop())) {
      const [x, y] = next;
      const value = get(x, y);
      if (value >= 9) {
        continue;
      }
      const id = `${x},${y}`;
      if (touched.has(id)) {
        continue;
      }
      touched.add(id);
      count++;
      if (get(x + 1, y) >= value) {
        todo.push([x + 1, y]);
      }
      if (get(x - 1, y) >= value) {
        todo.push([x - 1, y]);
      }
      if (get(x, y + 1) >= value) {
        todo.push([x, y + 1]);
      }
      if (get(x, y - 1) >= value) {
        todo.push([x, y - 1]);
      }
    }
    basins.push(count);
  }

  return basins
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((product, c) => product * c, 1);
}

console.log(main());
