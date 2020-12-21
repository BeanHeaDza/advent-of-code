import { readInput } from "../../common";

function main() {
  const input = readInput();
  const keyPad = [
    ["", "", "1", "", ""],
    ["", "2", "3", "4", ""],
    ["5", "6", "7", "8", "9"],
    ["", "A", "B", "C", ""],
    ["", "", "D", "", ""],
  ];

  const answer: string[] = [];

  let x = 0;
  let y = 2;

  for (const line of input) {
    for (const c of line) {
      if (c === "U" && y > 0 && keyPad[y - 1][x]) {
        y--;
      } else if (c === "R" && x < 4 && keyPad[y][x + 1]) {
        x++;
      } else if (c === "D" && y < 4 && keyPad[y + 1][x]) {
        y++;
      } else if (c === "L" && x > 0 && keyPad[y][x - 1]) {
        x--;
      }
    }
    answer.push(keyPad[y][x]);
  }

  return answer.join("");
}

console.log(main());
