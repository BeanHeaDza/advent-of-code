import { readInput } from "../../common";

function getSeatId(codes: string) {
  let min = 0,
    max = 127,
    id: number;

  for (const c of codes.split("").slice(0, 7)) {
    const mid = (min + max) / 2;
    if (c === "F") {
      max = Math.floor(mid);
    } else {
      min = Math.ceil(mid);
    }
  }
  id = min * 8;

  min = 0;
  max = 7;

  for (const c of codes.split("").slice(7, 10)) {
    const mid = (min + max) / 2;
    if (c === "L") {
      max = Math.floor(mid);
    } else {
      min = Math.ceil(mid);
    }
  }

  id += min;

  return id;
}

function main() {
  const input = readInput();
  const ids = input.map(getSeatId);

  for (let x = 0; x < 991; x++) {
    if (ids.includes(x + 1) && ids.includes(x - 1) && !ids.includes(x)) {
      return x;
    }
  }
}

console.log(main());
