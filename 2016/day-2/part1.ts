import { readInput } from "../../common";

function main() {
  const input = readInput();
  const keyPad = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  const answer: number[] = [];

  let x = 1;
  let y = 1;

  for (const line of input) {
    for (const c of line) {
      if (c === "U" && y > 0) {
        y--;
      } else if (c === "R" && x < 2) {
        x++;
      } else if (c === "D" && y < 2) {
        y++;
      } else if (c === "L" && x > 0) {
        x--;
      }
    }
    answer.push(keyPad[y][x]);
  }

  return answer.join("");
}

console.log(main());
