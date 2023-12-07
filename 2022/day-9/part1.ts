import { readInput } from "../../common";
import { Position, updateKnotFn } from "./update-knot-fn";

function main() {
  const input = readInput();

  let head: Position = { x: 0, y: 0 };
  let tail: Position = { x: 0, y: 0 };
  const tailPos = new Set(["0,0"]);

  const updateTail = updateKnotFn(head, tail, tailPos);
  for (const line of input) {
    const [dir, sCount] = line.split(" ");
    const count = +sCount;
    let mod: Function;
    if (dir === "U") mod = () => head.x++;
    else if (dir === "D") mod = () => head.x--;
    else if (dir === "R") mod = () => head.y++;
    else if (dir === "L") mod = () => head.y--;

    for (let x = 0; x < count; x++) {
      mod();
      updateTail();
    }
  }
  return tailPos.size;
}

console.log(main());
