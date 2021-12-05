import { readInput } from "../../common";

function* parse(input: string[]) {
  for (const line of input) {
    const parts = line.split(" -> ");
    const [x1, y1] = parts[0].split(",").map(Number);
    const [x2, y2] = parts[1].split(",").map(Number);
    yield { x1, y1, x2, y2 };
  }
}

function main() {
  const input = [...parse(readInput())];
  const points = new Map<string, number>();
  const addPoint = (x: number, y: number) => {
    const key = `${x}:${y}`;
    const value = points.get(key) || 0;
    points.set(key, value + 1);
  };

  for (const { x1, y1, x2, y2 } of input) {
    if (x1 === x2) {
      const lower = y1 < y2 ? y1 : y2;
      const higher = y1 >= y2 ? y1 : y2;
      for (let i = lower; i <= higher; i++) {
        addPoint(x1, i);
      }
    } else if (y1 === y2) {
      const lower = x1 < x2 ? x1 : x2;
      const higher = x1 >= x2 ? x1 : x2;
      for (let i = lower; i <= higher; i++) {
        addPoint(i, y1);
      }
    }
  }

  return [...points.values()].filter((x) => x > 1).length;
}

console.log(main());
