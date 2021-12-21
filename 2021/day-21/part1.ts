import { readInput } from "../../common";

function* diceRoll(): Generator<number> {
  while (true) {
    for (let x = 1; x <= 100; x++) {
      yield x;
    }
  }
}

function main() {
  let [p1, p2] = readInput().map((l) => +l[l.length - 1] - 1);
  let s1 = 0;
  let s2 = 0;
  const die = diceRoll();
  let rolls = 0;
  let loserScore = 0;
  const nextDice = () => {
    rolls += 3;
    return die.next().value + die.next().value + die.next().value;
  };

  while (true) {
    p1 = (p1 + nextDice()) % 10;
    s1 += p1 + 1;
    if (s1 >= 1000) {
      loserScore = s2;
      break;
    }
    p2 = (p2 + nextDice()) % 10;
    s2 += p2 + 1;
    if (s2 >= 1000) {
      loserScore = s1;
      break;
    }
  }
  return loserScore * rolls;
}

console.log(main());
