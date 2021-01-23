import memoizee from "memoizee";
import { readInput } from "../../common";

function isWallFactory(favNumber: number) {
  return memoizee((x: number, y: number) => {
    if (x < 0 || y < 0) {
      return true;
    }

    let val = x * x + 3 * x + 2 * x * y + y + y * y + favNumber;
    let bin = val.toString(2);

    return bin.split("").filter((c) => c === "1").length % 2 === 1;
  });
}

function main() {
  const [input] = readInput().map(Number);
  const target = "31,39";

  const isWall = isWallFactory(input);

  const done = new Map<string, number>([["1,1", 0]]);
  const todo = ["1,1"];

  const check = (x: number, y: number, dist: number) => {
    const key = `${x},${y}`;
    if (isWall(x, y) || done.has(key)) {
      return;
    }

    done.set(key, dist);
    todo.push(key);
  };

  while (!done.has(target)) {
    for (const key of todo.splice(0)) {
      const dist = done.get(key);
      const [x, y] = key.split(",").map(Number);
      check(x + 1, y, dist + 1);
      check(x - 1, y, dist + 1);
      check(x, y + 1, dist + 1);
      check(x, y - 1, dist + 1);
    }
  }

  return [...done.values()].filter((s) => s <= 50).length;
}

console.log(main());
