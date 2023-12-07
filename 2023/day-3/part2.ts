import { readInput } from "../../common";

function main() {
  const input = readInput();
  let answer = 0;
  const numberLookup = new Map<string, { num: number }>();
  for (let y = 0; y < input.length; y++) {
    const row = input[y];
    const matches = row.matchAll(/\d+/g);
    for (const match of matches) {
      const value = { num: +match[0] };
      for (let i = 0; i < match[0].length; i++) {
        numberLookup.set(`${match.index + i},${y}`, value);
      }
    }
  }

  for (let y = 0; y < input.length; y++) {
    const row = input[y];
    for (let x = 0; x < row.length; x++) {
      const c = row[x];
      if (row[x] !== "*") {
        continue;
      }

      const numbers = new Set<{ num: number } | undefined>();
      numbers.add(numberLookup.get(`${x - 1},${y - 1}`));
      numbers.add(numberLookup.get(`${x},${y - 1}`));
      numbers.add(numberLookup.get(`${x + 1},${y - 1}`));
      numbers.add(numberLookup.get(`${x - 1},${y}`));
      numbers.add(numberLookup.get(`${x + 1},${y}`));
      numbers.add(numberLookup.get(`${x - 1},${y + 1}`));
      numbers.add(numberLookup.get(`${x},${y + 1}`));
      numbers.add(numberLookup.get(`${x + 1},${y + 1}`));
      numbers.delete(undefined);
      if (numbers.size === 2) {
        const [n1, n2] = [...numbers];
        answer += n1.num * n2.num;
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
