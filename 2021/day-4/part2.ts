import { sum } from "lodash";
import { readInput } from "../../common";

function main() {
  const input = readInput();
  const picks = input[0].split(",").map(Number);
  const blocks: number[][][] = [];
  const sums = [];

  let next: number[][] = [];
  for (let i = 0; i < input.length - 2; i++) {
    const row = input[i + 2];
    if (i % 6 === 5 && next.length) {
      blocks.push(next);
      next = [];
    } else {
      next.push(row.trim().split(/\s+/g).map(Number));
      sums[blocks.length] =
        (sums[blocks.length] || 0) + sum(next[next.length - 1]);
    }
  }
  blocks.push(next);
  const winners = new Set();

  let pickSum = 0;
  for (const pick of picks) {
    pickSum += pick;
    for (let x = 0; x < blocks.length; x++) {
      const block = blocks[x];
      for (let y = 0; y < block.length; y++) {
        const row = block[y];
        for (let z = 0; z < row.length; z++) {
          if (row[z] === pick) {
            row[z] = -1;
            if (isWinner(block)) {
              winners.add(x);
              if (winners.size === blocks.length) {
                let sum = 0;
                for (const row of block) {
                  for (const cell of row) {
                    if (cell !== -1) {
                      sum += cell;
                    }
                  }
                }

                return sum * pick;
              }
            }
          }
        }
      }
    }
  }

  return blocks.length;
}

function isWinner(block: number[][]) {
  if (block.map((b) => sum(b)).some((r) => r === -5)) {
    return true;
  }

  for (let x = 0; x < 5; x++) {
    if (sum(block.map((r) => r[x])) === -5) {
      return true;
    }
  }

  return false;
}

console.log(main());
