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

  let answer = 0;
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
        answer += c + 1;
      }
    }
  }

  return answer;
}

console.log(main());
