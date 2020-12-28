import { readInput } from "../../common";

function hasPalindrome(line: string) {
  for (let x = 1; x < line.length - 2; x++) {
    if (
      line[x] !== line[x - 1] &&
      line[x] === line[x + 1] &&
      line[x - 1] === line[x + 2]
    ) {
      return true;
    }
  }

  return false;
}

function isIP7(line: string) {
  const squares: string[] = [];
  line = line.replace(/\[\w+?\]/g, (word) => {
    squares.push(word.slice(1, word.length - 1));
    return "[|]";
  });

  if (squares.some(hasPalindrome)) {
    return false;
  }

  return hasPalindrome(line);
}

function main() {
  const input = readInput();

  return input.filter(isIP7).length;
}

console.log(main());
