import { groupBy } from "lodash";
import { readInput } from "../../common";

const CARDS = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"];
CARDS.reverse();

class Hand {
  readonly sortValue = 0;
  constructor(readonly hand: string, readonly bid: number) {
    let multiplier = 1;
    for (const c of hand.split("").reverse()) {
      this.sortValue += CARDS.indexOf(c) * multiplier;
      multiplier *= CARDS.length;
    }
    this.sortValue += getType(hand) * multiplier;
  }
}

function main() {
  const input = readInput();
  const hands: Hand[] = [];
  for (const line of input) {
    const [hand, bid] = line.split(" ");
    hands.push(new Hand(hand, +bid));
  }
  hands.sort((a, b) => a.sortValue - b.sortValue);

  let answer = 0;
  for (let i = 0; i < hands.length; i++) {
    const hand = hands[i];
    answer += (i + 1) * hand.bid;
  }
  return answer;
}

console.log(main());

function getType(hand: string) {
  const cards = groupBy(hand, (c) => c);
  const jokers = cards.J?.length || 0;
  delete cards.J;
  const counts = Object.values(cards).map((g) => g.length);
  if (counts.length === 1 || counts.length === 0) {
    return 6;
  }
  if (counts.some((c) => c === 4 - jokers)) {
    return 5;
  }
  if (counts.length === 2) {
    return 4;
  }
  if (counts.some((c) => c === 3 - jokers)) {
    return 3;
  }
  if (counts.filter((c) => c === 2).length === 2) {
    return 2;
  }
  if (counts.some((c) => c === 2) || jokers === 1) {
    return 1;
  }
  if (counts.length === 5) {
    return 0;
  }

  throw new Error("Bad getType for " + hand);
}
