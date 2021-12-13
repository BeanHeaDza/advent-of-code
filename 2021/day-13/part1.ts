import { readInput } from "../../common";

function main() {
  const input = readInput();
  const splitIndex = input.indexOf("");
  const coords = new Set(input.slice(0, splitIndex));
  const commands = input.slice(splitIndex + 1);
  for (const cmd of commands) {
    const [, , temp] = cmd.split(" ");
    const [v, num] = temp.split("=");
    const n = +num;
    for (const key of coords) {
      const [x, y] = key.split(",").map(Number);
      if (v === "x" && x > n) {
        coords.delete(key);
        coords.add(`${n - (x - n)},${y}`);
      } else if (v === "y" && y > n) {
        coords.delete(key);
        coords.add(`${x},${n - (y - n)}`);
      }
    }
    break;
  }

  return coords.size;
}

console.log(main());
