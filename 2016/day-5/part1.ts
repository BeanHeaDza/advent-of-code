import md5 from "md5";
import { readInput } from "../../common";

function main() {
  const [input] = readInput();

  let pw = "";
  let x = 0;
  while (pw.length < 8) {
    const m = md5(input + x);
    if (m.startsWith("00000")) {
      pw += m[5];
    }
    x++;
  }

  return pw;
}

console.log(main());
