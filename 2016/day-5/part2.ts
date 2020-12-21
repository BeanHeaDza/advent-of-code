import md5 from "md5";
import { readInput } from "../../common";

function main() {
  const [input] = readInput();

  let pw = ["", "", "", "", "", "", "", ""];
  let x = 0;
  while (pw.join("").length < 8) {
    const m = md5(input + x);
    if (m.startsWith("00000") && pw[+m[5]] === "") {
      pw[+m[5]] = m[6];
    }
    x++;
  }

  return pw.join("");
}

console.log(main());
