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
  let maxId = 0;
  for (const ticket of input) {
    const id = getSeatId(ticket);
    if (id > maxId) {
      maxId = id;
    }
  }

  return maxId;
}

console.log(main());
