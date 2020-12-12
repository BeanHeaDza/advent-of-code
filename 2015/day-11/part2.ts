import { readInput } from "../../common";
import { nextPassword } from "./next-password";

function main() {
  let [input] = readInput();

  return nextPassword(nextPassword(input));
}

console.log(main());
