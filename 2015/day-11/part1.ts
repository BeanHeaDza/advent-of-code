import { readInput } from "../../common";
import { nextPassword } from "./next-password";

function main() {
  let [input] = readInput();

  return nextPassword(input);
}

console.log(main());
