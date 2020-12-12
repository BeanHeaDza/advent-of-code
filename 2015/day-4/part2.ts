import md5 from "md5";
import { readInput } from "../../common";

function main() {
  const [input] = readInput();

  let x = 0;
  while (!md5(`${input}${x}`).startsWith("000000")) {
    x++;
  }
  return x;
}

console.log(main());
