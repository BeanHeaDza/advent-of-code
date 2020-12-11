import { readFileSync } from "fs";

export function readInput() {
  const content = readFileSync("day-1/input.txt", { encoding: "utf8" });
  return content.split("\n").map(Number);
}

