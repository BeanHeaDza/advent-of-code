import { readInput } from "../../common";
import { Position, updateKnotFn } from "./update-knot-fn";

function main() {
  const input = readInput();
  const knots: { pos: Position; updateFn?: () => void }[] = [];
  const tailPos = new Set(["0,0"]);
  for (let x = 0; x < 10; x++) {
    const pos = { x: 0, y: 0 };
    const updateFn =
      x > 0
        ? updateKnotFn(knots[x - 1].pos, pos, x === 9 ? tailPos : undefined)
        : undefined;
    knots.push({ pos, updateFn });
  }
  for (const line of input) {
    const [dir, sCount] = line.split(" ");
    const count = +sCount;
    let mod: Function;
    if (dir === "U") mod = () => knots[0].pos.x++;
    else if (dir === "D") mod = () => knots[0].pos.x--;
    else if (dir === "R") mod = () => knots[0].pos.y++;
    else if (dir === "L") mod = () => knots[0].pos.y--;

    for (let x = 0; x < count; x++) {
      mod();
      for (let y = 0; y < knots.length; y++) {
        knots[y].updateFn && knots[y].updateFn();
      }
    }
  }
  return tailPos.size;
}

console.log(main());
