import { readInput } from "../../common";

const SOLVED_STATE = ".".repeat(11) + "abcd".repeat(4);
const COST_MULTIPLIER = new Map([
  ["a", 1],
  ["b", 10],
  ["c", 100],
  ["d", 1000],
]);
COST_MULTIPLIER.forEach((v, k) => COST_MULTIPLIER.set(k.toUpperCase(), v));
const A_CODE = "a".charCodeAt(0);
const LETTER_COLUMN = new Map(
  "abcd"
    .split("")
    .map<[string, number]>((c) => [c, 3 + 2 * (c.charCodeAt(0) - A_CODE)])
);
LETTER_COLUMN.forEach((v, k) => LETTER_COLUMN.set(k.toUpperCase(), v));

function* solve(
  state: string,
  blocks: Block[],
  answerObj: { answer: number },
  prevCost = 0
) {
  if (state === SOLVED_STATE) {
    yield prevCost;
    return;
  }
  if (prevCost >= answerObj.answer) {
    return;
  }
  for (const block of blocks) {
    for (const { newState, cost } of block.validActions(state)) {
      yield* solve(newState, blocks, answerObj, cost + prevCost);
    }
  }
}

class Block {
  accepts = new Set<string>();
  constructor(
    readonly x: number,
    readonly y: number,
    readonly index: number,
    readonly grid: Map<string, Block>
  ) {}
  neighbors: Block[] = [];

  getValue(state: string) {
    return state[this.index];
  }

  *validActions(state: string): Generator<{ cost: number; newState: string }> {
    const c = this.getValue(state);
    if (c === ".") {
      return;
    }
    const targetColumn = LETTER_COLUMN.get(c);
    if (targetColumn === this.x && c === c.toLowerCase()) {
      return;
    }

    // Check if this can be moved to it's final location
    const dist = this.maybeGetFinalLocation(state);
    if (dist) {
      const moves = this.maybeMoveTo(state, dist[0], dist[1]);
      if (moves) {
        const cost = moves * COST_MULTIPLIER.get(c);
        const stateArr = state.split("");
        const targetIndex = this.grid.get(dist.join(",")).index;

        stateArr[this.index] = ".";
        stateArr[targetIndex] = c.toLowerCase();
        const newState = stateArr.join("");
        yield { cost, newState };
        return;
      }
    }

    // If we couldn't move it to it's destination try moving it to the top row
    if (this.y === 1) {
      return;
    }
    for (const targetX of [1, 2, 11, 10, 4, 6, 8]) {
      const moves = this.maybeMoveTo(state, targetX, 1);
      if (moves) {
        const cost = moves * COST_MULTIPLIER.get(c);
        const stateArr = state.split("");
        const targetIndex = this.grid.get([targetX, 1].join(",")).index;

        stateArr[this.index] = ".";
        stateArr[targetIndex] = c.toLowerCase();
        const newState = stateArr.join("");
        yield { cost, newState };
      }
    }
  }

  maybeGetFinalLocation(state: string) {
    const c = this.getValue(state).toLowerCase();
    const x = LETTER_COLUMN.get(c);
    for (let y = 5; y > 1; y--) {
      const v = this.grid.get([x, y].join(",")).getValue(state);
      if (v === ".") {
        return [x, y];
      } else if (v !== c) {
        return undefined;
      }
    }
    throw new Error("Should never reach here");
  }

  maybeMoveTo(state: string, targetX: number, targetY: number) {
    let x = this.x;
    let y = this.y;
    let moves = 0;
    while (y > 1) {
      moves++;
      if (this.grid.get([x, --y].join(",")).getValue(state) !== ".") {
        return undefined;
      }
    }
    while (x !== targetX) {
      moves++;
      x += x > targetX ? -1 : 1;
      if (this.grid.get([x, y].join(",")).getValue(state) !== ".") {
        return undefined;
      }
    }
    while (y < targetY) {
      moves++;
      if (this.grid.get([x, ++y].join(",")).getValue(state) !== ".") {
        return undefined;
      }
    }
    return moves;
  }
}
function main() {
  const input = readInput();
  let i = 0;
  const blocks: Block[] = [];
  const grid = new Map<string, Block>();
  let state = "";
  for (let y = 0; y < input.length; y++) {
    const row = input[y];
    for (let x = 0; x < row.length; x++) {
      const c = row[x];
      if ("ABCD.".includes(c)) {
        state += c;
        const block = new Block(x, y, i++, grid);
        grid.set([x, y].join(","), block);
        blocks.push(block);
      }
    }
  }
  const answerObj = { answer: Number.POSITIVE_INFINITY };
  for (const newAnswer of solve(state, blocks.reverse(), answerObj)) {
    if (newAnswer < answerObj.answer) {
      answerObj.answer = newAnswer;
    }
  }
  return answerObj.answer;
}

console.log(main());
