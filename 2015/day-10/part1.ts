import { readInput } from "../../common";
import { lookAndSay } from "./look-and-say";

function main() {
  let [input] = readInput();

  for (let x = 0; x < 40; x++) {
    input = lookAndSay(input);
  }

  return input.length;
}

console.log(main());
