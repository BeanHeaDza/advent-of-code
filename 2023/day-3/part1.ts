import { readInput } from "../../common";

function main() {
  const input = readInput();
  let answer = 0;
  for (let y = 0; y < input.length; y++) {
    const row = input[y];
    const matches = row.matchAll(/\d+/g);
    for (const match of matches) {
      const left = match.index - 1;
      const right = match.index + match[0].length;
      if (/[^\d\.]/.test(get(input, left, y))) {
        answer += +match[0];
        continue;
      }
      if (/[^\d\.]/.test(get(input, right, y))) {
        answer += +match[0];
        continue;
      }
      let foundStar = false;
      for (let subX = left; subX <= right; subX++) {
        if (/[^\d\.]/.test(get(input, subX, y - 1))) {
          foundStar = true;
          break;
        }
      }
      for (let subX = left; subX <= right; subX++) {
        if (/[^\d\.]/.test(get(input, subX, y + 1))) {
          foundStar = true;
          break;
        }
      }

      if (foundStar) {
        answer += +match[0];
      }
    }
  }

  return answer;
}

function get(schematic: string[], x: number, y: number): string {
  const row = schematic[y] || [];
  return row[x] || "";
}

console.log(main());
