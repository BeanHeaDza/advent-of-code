import { readInput } from "../../common";

function main() {
  const input = readInput();
  const chars = ["()", "{}", "[]", "<>"];
  const scoreMap = new Map([
    [")", 3],
    ["]", 57],
    ["}", 1197],
    [">", 25137],
  ]);
  const openToClose = new Map(
    chars.map((c) => c.split("") as [string, string])
  );
  let score = 0;
  for (const line of input) {
    const openStack = [];
    for (const c of line) {
      if (openToClose.has(c)) {
        openStack.push(openToClose.get(c));
      } else {
        const [expected] = openStack.pop();
        if (c !== expected) {
          score += scoreMap.get(c) || 0;
          break;
        }
      }
    }
  }
  return score;
}

console.log(main());
