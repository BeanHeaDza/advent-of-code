import { readInput } from "../../common";

function getId(row: number, column: number) {
  let id = 0;
  for (let x = 1; x <= column; x++) {
    id += x;
  }

  let inc = column;
  for (let y = 1; y < row; y++) {
    id += inc++;
  }

  return id;
}

function main() {
  const [input] = readInput();
  const row = +input.replace(/.*row (\d+).*/, "$1");
  const column = +input.replace(/.*column (\d+).*/, "$1");
  const id = getId(row, column);

  let answer = 20151125;
  for (let x = 1; x < id; x++) {
    answer = (answer * 252533) % 33554393;
  }

  return answer;
}

console.log(main());
