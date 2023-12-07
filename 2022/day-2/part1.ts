import { readInput } from "../../common";

enum RPSElf {
  Rock = "A",
  Paper = "B",
  Scissors = "C",
}
enum RPSYou {
  Rock = "X",
  Paper = "Y",
  Scissors = "Z",
}

const RPSValue = {
  [RPSYou.Rock]: 1,
  [RPSYou.Paper]: 2,
  [RPSYou.Scissors]: 3,
};

function main() {
  const input = readInput();
  let score = 0;
  for (const row of input) {
    const [opp, you] = row.split(" ") as [RPSElf, RPSYou];
    if (
      (opp === RPSElf.Rock && you === RPSYou.Rock) ||
      (opp === RPSElf.Paper && you === RPSYou.Paper) ||
      (opp === RPSElf.Scissors && you === RPSYou.Scissors)
    ) {
      score += 3;
    } else if (
      (opp === RPSElf.Rock && you === RPSYou.Paper) ||
      (opp === RPSElf.Paper && you === RPSYou.Scissors) ||
      (opp === RPSElf.Scissors && you === RPSYou.Rock)
    ) {
      score += 6;
    }
    score += RPSValue[you];
  }
  return score;
}

console.log(main());
