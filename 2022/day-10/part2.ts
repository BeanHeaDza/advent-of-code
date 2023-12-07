import { readInput } from "../../common";
import { CathodeRayTube } from "./cathode-ray-tube";

function main() {
  const display = new CathodeRayTube();
  let answer = ".";
  display.addHandler((register, cycle) => {
    const pos = (cycle - 1) % 40;
    if (pos === 0) {
      answer += "\n";
    }
    answer += Math.abs(register - pos) <= 1 ? "#" : " ";
  });
  const input = readInput();
  input.forEach((l) => display.execLine(l));
  return answer;
}

console.log(main());
