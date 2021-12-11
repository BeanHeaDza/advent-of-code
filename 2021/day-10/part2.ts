import { readInput } from "../../common";

function main() {
  const input = readInput();
  const chars = ["()", "{}", "[]", "<>"];
  const scoreMap = new Map([
    [")", 1],
    ["]", 2],
    ["}", 3],
    [">", 4],
  ]);
  const openToClose = new Map(
    chars.map((c) => c.split("") as [string, string])
  );
  let scores: number[] = [];
  for (const line of input) {
    const openStack = [];
    let broken = false;
    for (const c of line) {
      if (openToClose.has(c)) {
        openStack.push(openToClose.get(c));
      } else {
        const [expected] = openStack.pop();
        if (c !== expected) {
          broken = true;
          break;
        }
      }
    }

    if (broken || !openStack.length) {
      continue;
    }
    let answer = 0;
    for (const c of openStack.reverse()) {
      answer *= 5;
      answer += scoreMap.get(c);
    }
    scores.push(answer);
  }
  const sorted = scores.sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

console.log(main());
