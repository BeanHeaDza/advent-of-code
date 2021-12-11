import { readInput } from "../../common";

const TRAPS = new Set(["^^.", ".^^", "^..", "..^"]);

function main() {
  let row = readInput()[0];
  let answer = row.split("").filter((c) => c === ".").length;
  for (let r = 1; r < 400000; r++) {
    let newRow = "";
    for (let i = 0; i < row.length; i++) {
      const l = row[i - 1] || ".";
      const c = row[i];
      const r = row[i + 1] || ".";
      const all = l + c + r;

      if (TRAPS.has(all)) {
        newRow += "^";
      } else {
        answer += 1;
        newRow += ".";
      }
    }
    row = newRow;
  }
  return answer;
}

console.log(main());
