import { readInput } from "../../common";

class Cup {
  constructor(public readonly value: number) {}
  left: Cup;
  right: Cup;
}

function play(cups: Map<number, Cup>, current: Cup) {
  const removed: Cup[] = [
    current.right,
    current.right.right,
    current.right.right.right,
  ];
  const removedValues = removed.map((c) => c.value);

  current.right = removed[2].right;
  current.right.left = current;

  let targetValue = current.value - 1;
  if (targetValue < 1) {
    targetValue = cups.size;
  }
  while (removedValues.includes(targetValue)) {
    if (--targetValue < 1) {
      targetValue = cups.size;
    }
  }

  const targetCup = cups.get(targetValue);
  const rightOfTarget = targetCup.right;

  targetCup.right = removed[0];
  removed[0].left = targetCup;
  rightOfTarget.left = removed[2];
  removed[2].right = rightOfTarget;

  return current.right;
}

function mapCups(cups: number[]) {
  const cupMap = new Map<number, Cup>();

  const addCup = (i: number) => {
    const cup = new Cup(cups[i]);
    const p = cups[i === 0 ? cups.length - 1 : i - 1];
    const n = cups[i === cups.length - 1 ? 0 : i + 1];
    const pCup = cupMap.get(p);
    const nCup = cupMap.get(n);

    if (pCup) {
      pCup.right = cup;
      cup.left = pCup;
    }
    if (nCup) {
      nCup.left = cup;
      cup.right = nCup;
    }

    cupMap.set(cups[i], cup);
  };

  for (let x = 0; x < cups.length; x++) {
    addCup(x);
  }

  return cupMap;
}

function main() {
  const [input] = readInput();

  const cups = input.split("").map(Number);
  while (cups.length < 1000000) {
    cups.push(cups.length + 1);
  }
  const cupMap = mapCups(cups);

  let currentCup = cupMap.get(cups[0]);
  for (let x = 0; x < 10000000; x++) {
    currentCup = play(cupMap, currentCup);
  }

  currentCup = cupMap.get(1);

  return currentCup.right.value * currentCup.right.right.value;
}

console.log(main());
