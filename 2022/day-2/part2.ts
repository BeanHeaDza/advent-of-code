import { readInput } from "../../common";

enum RPS {
  Rock = "A",
  Paper = "B",
  Scissors = "C",
}
enum Outcome {
  Lose = "X",
  Draw = "Y",
  Win = "Z",
}

const outcomeValue = {
  [Outcome.Lose]: 0,
  [Outcome.Draw]: 3,
  [Outcome.Win]: 6,
};

const RPSValue = {
  [RPS.Rock]: 1,
  [RPS.Paper]: 2,
  [RPS.Scissors]: 3,
};

function main() {
  const input = readInput();
  let score = 0;
  for (const row of input) {
    const [elf, outcome] = row.split(" ") as [RPS, Outcome];
    score += outcomeValue[outcome];
    if (outcome === Outcome.Draw) {
      score += RPSValue[elf];
    } else if (elf === RPS.Paper) {
      score +=
        outcome === Outcome.Lose ? RPSValue[RPS.Rock] : RPSValue[RPS.Scissors];
    } else if (elf === RPS.Rock) {
      score +=
        outcome === Outcome.Lose ? RPSValue[RPS.Scissors] : RPSValue[RPS.Paper];
    } else {
      score +=
        outcome === Outcome.Lose ? RPSValue[RPS.Paper] : RPSValue[RPS.Rock];
    }
  }
  return score;
}

console.log(main());
