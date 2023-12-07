interface Input {
  stacks: string[][];
  moves: { from: number; to: number; count: number }[];
}

export function parse(input: string[]): Input {
  const stacks: string[][] = [];
  const numberLineIndex = input.findIndex((l) => /^[ 1-9]+$/.test(l));
  const stackCount = Math.ceil(input[numberLineIndex].length / 4);
  for (let x = 0; x < stackCount; x++) {
    stacks.push([]);
  }
  for (let x = numberLineIndex - 1; x >= 0; x--) {
    for (let y = 0; y < stackCount; y++) {
      const item = input[x][y * 4 + 1];
      item.trim() && stacks[y].push(item);
    }
  }

  const moves = input
    .slice(numberLineIndex + 2)
    .map((l) => /move (\d+) from (\d+) to (\d+)/g.exec(l))
    .map((a) => a.slice(1).map(Number))
    .map(([count, from, to]) => ({ count, from: from - 1, to: to - 1 }));

  return { stacks, moves };
}
