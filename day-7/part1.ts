import { readInput } from "../common";

function getBagContains(line: string) {
  const bagMatch = /^(.*?) bags contain/.exec(line);
  line = line.substr(bagMatch[0].length);

  if (line === " no other bags.") {
    return {
      bag: bagMatch[1],
      contains: [],
    };
  }

  const re = /,? \d+ (.*?) bags?/g;
  let match = re.exec(line);
  const contains = [];
  while (match) {
    contains.push(match[1]);
    match = re.exec(line);
  }
  return {
    bag: bagMatch[1],
    contains,
  };
}

function main() {
  const input = readInput();
  const bags = input.map(getBagContains);
  let answer = 0;

  const containersToFind = ["shiny gold"];
  const containersFound = [];

  while (containersToFind.length > 0) {
    const next = containersToFind.splice(0, 1)[0];
    const parentBags = bags
      .filter(
        ({ bag, contains }) =>
          contains.includes(next) && !containersFound.includes(bag)
      )
      .map(({ bag }) => bag);

    answer += parentBags.length;
    containersFound.push(...parentBags);
    containersToFind.push(...parentBags);
  }

  return answer;
}

console.log(main());
