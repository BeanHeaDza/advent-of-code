import { readInput } from "../../common";
import { CathodeRayTube } from "./cathode-ray-tube";

function main() {
  const display = new CathodeRayTube();
  let answer = 0;
  display.addHandler(
    (register, cycle) =>
      (answer += (cycle - 20) % 40 !== 0 ? 0 : register * cycle)
  );
  const input = readInput();
  input.forEach((l) => display.execLine(l));
  return answer;
}

console.log(main());
