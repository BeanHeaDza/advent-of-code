import { readInput } from "../../common";

export function parseHappiness() {
  const input = readInput();
  const happinessMap = new Map<string, number>();
  const peopleSet = new Set<string>();

  for (const line of input) {
    const match = /^(\w+) would (gain|lose) (\d+) happiness units? by sitting next to (\w+)\.$/.exec(
      line
    );

    const sign = match[2] === "gain" ? 1 : -1;
    happinessMap.set(`${match[1]},${match[4]}`, sign * +match[3]);
    peopleSet.add(match[1]);
    peopleSet.add(match[4]);
  }

  const people = [...peopleSet];
  return { happinessMap, people };
}
