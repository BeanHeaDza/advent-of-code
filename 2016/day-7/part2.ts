import { readInput } from "../../common";

function getBAB(line: string) {
  const result: string[] = [];
  for (let x = 0; x < line.length - 2; x++) {
    if (line[x] !== line[x + 1] && line[x] === line[x + 2]) {
      result.push(`${line[x + 1]}${line[x]}${line[x + 1]}`);
    }
  }

  return result;
}

function isSSL(line: string) {
  const squares: string[] = [];
  line = line.replace(/\[\w+?\]/g, (word) => {
    squares.push(word.slice(1, word.length - 1));
    return "[|]";
  });

  const searchString = squares
    .map(getBAB)
    .filter((a) => a.length > 0)
    .map((a) => a.join("|"))
    .join("|");

  return searchString.length > 0 && new RegExp(searchString).test(line);
}

function main() {
  const input = readInput();

  return input.filter(isSSL).length;
}

console.log(main());
